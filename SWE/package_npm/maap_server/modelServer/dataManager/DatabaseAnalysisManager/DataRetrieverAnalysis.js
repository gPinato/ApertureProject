/**
 * File: DataRetrieverAnalysis.js
 * Module: maap_server::modelServer::dataManager::DatabaseAnalysisManager
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

var indexManager = require('../IndexManager/IndexManager');
var DB = require('../../database/MongooseDBAnalysis');
var collectionsList = require('../../DSL/collectionData/collectionsList.json');

var getModel = function(collection_name) {
	
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
//for unit test
exports.getModel = getModel;


var getDocuments = function(model, querySettings, populate, callback){
		
	var options = {};
	var sort = {};
	
	if(querySettings.orderbycolumn != '' && querySettings.typeorder != ''){
		sort[querySettings.orderbycolumn] = querySettings.typeorder;
		options.sort = sort;
	}
	if(querySettings.numberofrow != ''){
		options.limit = querySettings.numberofrow;
	}
	if(querySettings.startskip != ''){
		options.skip = querySettings.startskip;
	}
		
	var query = model.find(querySettings.where, querySettings.select, options);
	//var query = model.find(querySettings.where, {}, {});
	
	console.log('query: ' + JSON.stringify(querySettings));
	console.log('options: ' + JSON.stringify(options));
	console.log('pop: ' + JSON.stringify(populate));
	
	if(populate != [])
	{
		var populatePath = [];
		var populateField = [];
		
		for(var i=0; i<populate.length; i++)
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
		if(err){console.log('query fallita' + err); callback({});}
					
		//a questo punto la query ha avuto successo,
		//controllo se la query e' stata eseguita su tutti 
		if(querySettings.select == undefined)querySettings.select = {};
		
		if(Object.keys(querySettings.select).length == 0)
		{
			//se sono stati selezionati tutti i campi, ora riempio la select per scrivere la query nel db
			if(result.length > 0)
			{
				for(var key in result[0])
				{
					querySettings.select[key] = 1;			//carico le chiavi utilizzate
				}
				indexManager.addQuery(model.modelName,  	//nome della collection
									  querySettings.select	//campi select
									);
			}			
		}else{
			//se la select era definita parzialmente aggiungo la query con l'indexManager
			indexManager.addQuery(model.modelName,  	//nome della collection
								  querySettings.select	//campi select
								  );
		}

		if(!result){
			console.log('nessun risultato') 
		}else{
			//console.log(result);
			//se � stato specificato il populate, sostituisco i vari populate...			
			if(populate!=[])
			{
				for(var i=0; i<result.length; i++)
				{
					var obj = result[i];
										
					//estraggo le informazioni corrette
					for(var attributename in obj)
					{
						//se un campo dati e' nullo lo sostituisco con un trattino :)
						if(obj[attributename] == undefined)
						{
							obj.attributename = '-';
							continue;
						}
						
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
			//console.log(result);
			callback(result);
			
		}
	});	
}

//ritorna la lista di collections, se e' definito un campo find di ricerca, restringe il 
//risultato alle sole collections che contengono il campo find all'interno della label
exports.getCollectionsList = function(find) {
	
	if(find != undefined && find != '')
	{
		var result = [];
		for(var i=0; i<collectionsList.length; i++)
		{
			var label = (collectionsList[i].label).toLowerCase();
			find = find.toLowerCase();
			if(label.indexOf(find) != -1)
			{
				result.push(collectionsList[i]);
			}		
		}	
		collectionsList = result;
	}
	
	return collectionsList;
	
}

//applica le varie trasformazioni presenti nel dsl ai vari campi dei documents nell'array di documents
var applyTrasformations = function(collection_name, type, documentsArray, dslArray) {

	for(var i=0; i<dslArray.length; i++)
	{
		if(dslArray[i].transformation != null)
		{
			var fieldName = dslArray[i].name;
			var file = require('../../DSL/collectionData/transformation_' + collection_name + '_' + type + '_' + fieldName + '.js');
			var transformation = file.transformation;
			for(var j=0; j<documentsArray.length; j++)
			{
				var document = documentsArray[j];
				for(var attributename in document)
				{
					if(attributename == fieldName)
					{
						document[attributename] = transformation(document[attributename]);
						//se e' indefinito visualizza un trattino
						if(document[attributename] == undefined) document[attributename]= '-';
					}
				}
			}
		}	
	}
	return documentsArray;
}

var sortDocumentsByLabels = function(documents, keys) {
	var result = [];
	for(var i=0; i<documents.length; i++)
	{
		var sortedDocument = {};
		for(var j=0; j<keys.length; j++)
		{
			sortedDocument[keys[j]] = documents[i][keys[j]];
			if(sortedDocument[keys[j]] == undefined)
				sortedDocument[keys[j]] = '-';
		}
		result.push(sortedDocument);
	}	
	return result;
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
		var keys = [];
		
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
				keys[i] = columns[i].name;
			}
			keys.push('_id');
		
			for(var i=0; i<columns.length; i++){
				var name = columns[i].name.split('.');
				if(name.length > 1){
					var data = {};
					data.field = name[1];
					data.key = name[0];
					populate.push(data);
				}else{
					if(name[0] == '_id')
					{
						//se il campo _id e' in lista per essere visualizzato
						//aggiorno l'etichetta
						labels[i] = '__IDLABEL2SHOW__' + labels[i];
					}
				}				
				select[name[0]] = 1; 
			}//for
			select.null = 1;
				
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
						
		var sort = {};
		sort[sortby] = order;
		
		model.find(query, null, sort).exec(function(err, docs) {
			
			var count = docs.length;
			var result = {};
			result.options = {};
			result.options.pages = Math.floor(count / perpage);
			if((count % perpage) > 0) result.options.pages++;

			var querySettings = {};
			querySettings.where = query; 
			querySettings.select = select;
			querySettings.orderbycolumn = sortby;
			querySettings.typeorder = order;
			querySettings.startskip = start;
			
			//se ci sono piu' documents di quanti ce ne starebbero nella pagina, 
			//limito a perpage
			if(count > perpage)
			{
				querySettings.numberofrow = perpage;
			}else{
				querySettings.numberofrow = '';
			}

			getDocuments(model,
						querySettings,
						populate,			//populate
						function(documents){
									
							if(columns != undefined)
							{
								//qui columns del dsl e' definita
								result.labels = labels;	
								documents = sortDocumentsByLabels(documents, keys);
								result.documents = applyTrasformations(collection_name, 'index', documents, columns);
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
		});
	}catch(err){
		//se la collection non e' presente, rispondo con la lista vuota
		console.log('err: ' + err);
		callback({});
	}
}

exports.getDocumentShow = function(collection_name, document_id, callback) {

	try{
		var model = getModel(collection_name);
		var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
		var rows = collection.show.row;
		
		//generazione array di labels
		var labels = [];
		var select = {};
		var populate = [];
		
		if(rows != undefined)
		{
			var keys = [];
			for(var i=0; i<rows.length; i++){
				if(rows[i].label != null)
				{
					labels[i] = rows[i].label;
				}else{
					labels[i] = rows[i].name;
				}
				keys[i] = rows[i].name;
			}
			keys.push('_id');
			
			for(var i=0; i<rows.length; i++){
				var name = rows[i].name.split('.');
				if(name.length > 1){
					var data = {};
					data.field = name[1];
					data.key = name[0];
					populate.push(data);
				}else{
					if(name[0] == '_id')
					{
						//se il campo _id e' in lista per essere visualizzato
						//aggiorno l'etichetta
						labels[i] = '__IDLABEL2SHOW__' + labels[i];
					}
				}	
				select[name[0]] = 1; 
			}//for
			
		}
		
		var query = {};
		query._id = document_id;
		
		var querySettings = {};
		querySettings.where = query; 
		querySettings.select = select;
		querySettings.orderbycolumn = '';
		querySettings.typeorder = '';
		querySettings.startskip = 0;
		querySettings.numberofrow = '';
		
		getDocuments(model,
					querySettings,
					populate,			//populate
					function(documents){
						var result = {};
						if(rows != undefined)
						{
							result.labels = labels;	
							documents = sortDocumentsByLabels(documents, keys);
							documents = applyTrasformations(collection_name, 'show', documents, rows);
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
	}catch(err){
		//se il document non e' presente, rispondo con la lista vuota
		console.log('err: ' + err);
		callback({});
	}
}

exports.getDocumentShowEdit = function(collection_name, document_id, callback) {

	try{
		var model = getModel(collection_name);
		var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
		var rows = collection.show.row;
		
		if(rows != undefined)
		{
			//generazione array di labels
			var labels = [];
			var keys = [];
			for(var i=0; i<rows.length; i++){
				var composedName = rows[i].name.split('.');
				if(composedName.length > 1)
				{
					//questo e' un campo composto, lo aggiungo solo una volta
					if(keys.indexOf(composedName[0]) == -1)
					{
						keys.push(composedName[0]);
						labels.push(composedName[0]);
					}
				}else{
					if(rows[i].label != null)
					{
						var name = rows[i].label;
					}else{
						var name = rows[i].name;
					}
					if(composedName[0] == '_id')
					{
						//se il campo _id e' in lista per essere visualizzato
						//aggiorno l'etichetta
						name = '__IDLABEL2SHOW__' + name;
					}
					labels.push(name);				
					keys.push(rows[i].name);
				}
			}
			keys.push('_id');
				
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
		}
		
		var query = {};
		query._id = document_id;
		
		var querySettings = {};
		querySettings.where = query; 
		querySettings.select = select;
		querySettings.orderbycolumn = '';
		querySettings.typeorder = '';
		querySettings.startskip = 0;
		querySettings.numberofrow = '';
		
		getDocuments(model,
					querySettings,
					'',					//populate
					function(documents){
						var result = {}
						if(rows != undefined)
						{
							result.labels = labels;	
							documents = sortDocumentsByLabels(documents, keys);
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
	}catch(err){
		//se il document non e' presente, rispondo con la lista vuota
		console.log('err: ' + err);
		callback({});
	}
}

exports.getDocumentShowEditNew = function(collection_name, document_id, callback) {

	var model = getModel(collection_name);
	
	var query = {};
	query._id = document_id;
	
	var querySettings = {};
	querySettings.where = query; 
	querySettings.select = {};
	querySettings.orderbycolumn = '';
	querySettings.typeorder = '';
	querySettings.startskip = 0;
	querySettings.numberofrow = '';
	
	//eseguo una query pulita e restituisco tutti i dati in formato json senza modifiche
	//per permettere all'utente di modificare i dati a piacimento
	getDocuments(model,
				querySettings,
				'',								//niente populate
				function(document2edit){
					callback(document2edit[0]); //restituisco il primo ed unico json dell'array
				});

}


exports.updateDocument = function(collection_name, document_id, newDocumentData, callback) {
	var model = getModel(collection_name);
	
	var criteria = {};
	criteria._id = document_id;
	var options = {};
	
	for(var key in newDocumentData)
	{
		if(key.indexOf('$') == 0) //rimuovo campi dati con il dollaro se ce ne sono (FIX temporaneo..)
			delete newDocumentData[key];
	}
	
	//se sto modificando i vari campi dati lasciando invariato l'_id
	if(newDocumentData._id == document_id)
	{
		delete newDocumentData._id; //rimuovo l'_id perch� non posso modificarlo con mongoose
	
		var query = model.update(criteria, {$set: newDocumentData}, options);
		query.lean().exec( function(err, count){
			if(err){console.log('document update fallito: ' + err); return;}
			if(count==0){
				//console.log('nessun risultato'); 
				callback(false);
			}else{
				//update avvenuto con successo
				callback(true);
			}
		});
	
	}else{
		
		//altrimenti se l'utente vuole modificare l'id, prima rimuovo il vecchio document
		removeDocument(collection_name, document_id, function(done){
			if(done)
			{
				//ora creo un nuovo document con il nuovo id
				model.create(newDocumentData, function(err){
					if(err)
					{
						callback(false);
					}else{
						//creazione avvenuta con successo
						callback(true);
					}			
				});
				
			}else{
				callback(false);
			}		
		});
	
	}
}

var removeDocument = function(collection_name, document_id, callback) {
	var criteria = {};
	criteria._id = document_id;
	
	var model = getModel(collection_name);
	
	var query = model.remove(criteria);
	query.lean().exec( function(err, count){
		if(err){console.log('rimozione document fallita: ' + err); return;}
		if(count == 0) {
			//console.log('niente da eliminare'); 
			callback(false);
		}else{
			//rimozione avvenuta con successo
			callback(true);			
		}
	});
}
exports.removeDocument = removeDocument;

exports.getModel=getModel;	
exports.sortDocumentsByLabels = sortDocumentsByLabels;
exports.getDocuments = getDocuments;
exports.applyTrasformations = applyTrasformations;
