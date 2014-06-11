/**
 * File: DataRetrieverAnalysis.js
 * Module: maap_server::ModelServer::DataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: recupero dati dal database di analisi
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

//var DB = require('../../Database/MongooseDBAnalysis');

var getModel = function(collection_name) {
	var DB = require('../../Database/MongooseDBAnalysis');
	var array = DB.model;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i].name == collection_name)
		{
			return array[i].model;
		}
	}
	return -1;
}

var getDocuments = function(model, where, select, orderbycolumn, typeorder, startskip, numberofrow, populate, callback){
	
	var options = {};
	if(orderbycolumn != '' && typeorder != ''){
		var sort = {};
		sort[orderbycolumn] = typeorder;
		options.sort = sort;
	}
	if(numberofrow != ''){
		options.limit = numberofrow;
	}
	if(startskip != ''){
		options.skip = startskip;
	}
		
	var query = model.find(where, select, options);
	
	if(populate != [])
	{
		var populatePath = [];
		var populateField = [];
		
		for(var i=0; i< populate.length; i++)
		{
			populatePath.push(populate[i].key);
			populateField.push(populate[i].field);
		}

		var selectPopulate = [];	
		for(var i=0; i<populateField.length; i++)
		{
			selectPopulate[populateField[i]]=1;
		}	
		
		for(var i=0; i<populatePath.length; i++)
		{
			query.populate({
				path: populatePath[i],
				select: selectPopulate[i]
			})
		}
	}
		
	query.lean().exec( function(err,result){
		if(err){console.log('query fallita' + err); return;}
		if(!result){
		console.log('nessun risultato') 
		}else{
			//se è stato specificato il populate, sostituisco i vari populate...			
			if(populate!=[])
			{
				for(var i=0; i<result.length; i++)
				{
					var obj = result[i];
					//estraggo le informazioni corrette
					for(var attributename in obj)
					{
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								var newfield = obj[populatePath[j]][populateField[j]];
								obj[populatePath[j] + '.' + populateField[j]] = newfield;
							}
						}
					}
								
					//pulisco i campi populate complessi ora che ho estratto tutte le info
					for(var attributename in obj)
					{
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								delete obj[populatePath[j]];
							}
						}
					}

				}
			}
			callback(result);
			
		}
	});	
}

exports.getCollectionsList = function() {
	var collectionsList = require('../../DSL/collectionData/collectionsList.json');
	return collectionsList;
}

var extractPopulate = function(populateArray, key) {
	for(var i=0; i<populateArray.length; i++){
		if(populateArray[i].key == key){
			return getModel(populateArray[i].collection);
		}
	}
	return '';
}

//applica le varie trasformazioni presenti nel dsl ai vari campi dei documents nell'array di documents
var applyTrasformations = function(type, documentsArray, dslArray) {

	for(var i=0; i<dslArray.length; i++)
	{
		if(dslArray[i].transformation != null)
		{
			var fieldName = dslArray[i].name;
			var file = require('../../DSL/collectionData/transformation_' + type + '_' + fieldName + '.js');
			var transformation = file.transformation;
			for(var j=0; j<documentsArray.length; j++)
			{
				var document = documentsArray[j];
				for(var attributename in document)
				{
					if(attributename == fieldName)
					{
						document[attributename] = transformation(document[attributename]);
					}
				}
			}
		}	
	}
	return documentsArray;
}

exports.getCollectionIndex = function(collection_name, column, order, page, callback) {

	var model = getModel(collection_name);
	try{
		//provo a vedere se la collection e' presente
		var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
	
		var columns = collection.index.column;
		
		var labels = [];
		var select = {};
		var populate = [];
			
		if(columns != undefined)
		{
			//generazione array di labels
			for(var i=0; i<columns.length; i++){
				if(columns[i].label != null)
				{
					labels[i] = columns[i].label;
				}else{
					labels[i] = columns[i].name;
				}
			}
		
			for(var i=0; i<columns.length; i++){
				var name = columns[i].name.split('.');
				if(name.length > 1){
					var data = {};
					data.field = name[1];
					data.key = name[0];
					populate.push(data);
				}
				select[name[0]] = 1; 
			}//for
			
		}
		
		//se la colonna non e' specificata uso le impostazioni del DSL, altrimenti uso le impostazioni
		//derivate dalla richiesta del client
		if(column == undefined)
		{
			var sortby = collection.index.sortby;
			order = collection.index.order;
		}else{
			var sortby = column;
		}
		
		var perpage = collection.index.perpage;
		var start = perpage * page;
		var query;
		if(collection.index.query == null)
			query = {};
		else
			query = collection.index.query;
			
		console.log(select);
		
		getDocuments(model,
					query, 				//where
					select,				//select 
					sortby, 			//colonna da ordinare
					order,				//tipo ordinamento
					start,				//partenza
					perpage,			//elementi per pagina
					populate,			//populate
					function(documents){
						var result = {};
						if(columns != undefined)
						{
							result.labels = labels;		
							result.documents = applyTrasformations('index', documents, columns);
						}else{	
							//nel caso la column non sia definita
							result.labels = [];
							if(documents.length > 0)
							{
								for(var key in documents[0])
								{
									result.labels.push(key);
								}
							}
							result.documents = documents;	//documents senza trasformazioni
						}
						callback(result);
					});
	}catch(err){
		//se la collection non e' presente, rispondo con la lista vuota
		console.log('err ' + err);
		callback({});
	}
}

exports.getDocumentShow = function(collection_name, document_id, callback) {

	var model = getModel(collection_name);
	var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
	var rows = collection.show.row;
	
	//generazione array di labels
	var labels = [];
	var select = {};
	var populate = [];
	
	if(rows != undefined)
	{
		for(var i=0; i<rows.length; i++){
			if(rows[i].label != null)
			{
				labels[i] = rows[i].label;
			}else{
				labels[i] = rows[i].name;
			}
		}

		for(var i=0; i<rows.length; i++){
			var name = rows[i].name.split('.');
			if(name.length > 1){
				var data = {};
				data.field = name[1];
				data.key = name[0];
				populate.push(data);
			}
			select[name[0]] = 1; 
		}//for
	}
	
	var query = {};
	query._id = document_id;
	
	getDocuments(model,
				query, 				//where
				select,				//select 
				'', 				//colonna da ordinare
				'',					//tipo ordinamento
				0,					//partenza
				'',					//elementi per pagina
				populate,			//populate
				function(documents){
					var result = {};
					if(rows != undefined)
					{
						result.labels = labels;		
						documents = applyTrasformations('show', documents, rows);
					}else{	
						//nel caso la row non sia definita
						result.labels = [];
						for(var key in documents[0])
						{
							result.labels.push(key);
						}
					}
					result.rows = documents[0];
					callback(result);
				});
}

exports.getDocumentShowEdit = function(collection_name, document_id, callback) {

	var model = getModel(collection_name);
	var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
	var rows = collection.show.row;
	
	//generazione array di labels
	var labels = [];
	for(var i=0; i<rows.length; i++){
		if(rows[i].name.split('.').length > 1) continue;
		if(rows[i].label != null)
		{
			labels.push(rows[i].label);
		}else{
			labels.push(rows[i].name);
		}
	}
	
	var select = {};
	var populate = [];
	for(var i=0; i<rows.length; i++){
	    var name = rows[i].name.split('.');
	    if(name.length > 1){
			var data = {};
			data.field = name[1];
			data.key = name[0];
			populate.push(data);
		}
		select[name[0]] = 1; 
	}//for
	
	var query = {};
	query._id = document_id;
	
	getDocuments(model,
				query, 				//where
				select,				//select 
				'', 				//colonna da ordinare
				'',					//tipo ordinamento
				0,					//partenza
				'',					//elementi per pagina
				'',					//populate
				function(documents){
					var result = {}
					result.labels = labels;		
					result.rows = documents[0];
					callback(result);
				});
}

exports.updateDocument = function(collection_name, document_id, newDocumentData, callback) {
	var model = getModel(collection_name);
	
	var criteria = {};
	criteria._id = document_id;
		
	var options = {};
	
	var query = model.update(criteria, {$set: newDocumentData}, options);
	query.lean().exec( function(err, count){
		if(err){console.log('document update fallito'); return;}
		if(count==0){
			console.log('nessun risultato'); 
		}else{
			//update avvenuto con successo, che fare ora?
			callback();
		}
	});
}

exports.removeDocument = function(collection_name, document_id, callback) {
	var criteria = {};
	criteria._id = document_id;
	
	var model = getModel(collection_name);
	
	var query = model.remove(criteria);
	query.lean().exec( function(err, count){
		if(err){console.log('rimozione document fallita'); return;}
		if(count == 0) {
			console.log('nessun risultato'); 
		}else{
			
			//rimozione avvenuta con successo, che fare ora?
			callback();
			
		}//else
	});

}
	