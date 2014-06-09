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

var queryDB = function(model,where,select,orderbycolumn,typeorder,startskip,numberofrow,populate,callback){
	
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
	
	console.log(options);
	
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
		if(err){console.log('query fallita'); return;}
		if(!result){
		console.log('nessun risultato') 
		}else{
			//se è stato specificato il populate, sostituisco i vari populate...
			if(populate!=[])
			{
				for(var i=0; i<result.length; i++)
				{
					var obj = result[i];
					for(var attributename in obj)
					{
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								var newfield = obj[populatePath[j]][populateField[j]];
								obj[populatePath[j]] = newfield;
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

exports.getDocumentsList = function(collection_name, column, order, page, callback) {

	var model = getModel(collection_name);
	
	var collection = require('../../DSL/collectionData/'+collection_name+'.json').collection;
	var columns = collection.index.column;
	
	var labels=[];
	for(var i = 0; i<columns.length;i++){
		labels[i]=columns[i].label;
	}//for
	
	var fieldsquery = {};
	
	var populateFields = [];
	for(var i=0; i<columns.length;i++){
	     var name=columns[i].name.split('.');
	    if(name.length>1){
			var data={};
			data.model=extractPopulate(collection.index.populate,name[0]);
			data.field=name[1];
			data.key=name[0];
			populateFields.push(data);
		}
		fieldsquery[name[0]]=1; 
	}//for
	
	if(column == undefined)
	{
		console.log('column indefinita');
		var sortby = collection.index.sortby;
		order = collection.index.order;
	}else{
		var sortby = column;
	}
	
	var perpage = collection.index.perpage;
	var start = perpage * page;
	var query;
	if(collection.index.query===null)
		query = {};
	else
		query = collection.index.query;
	
	var populateDSL = [{collection: 'coaches', key: 'coach'},{collection: 'coaches', key: 'coach2'},{collection: 'supermarkets', key: 'market'}];
	
	//TODO generare populate dal dsl piuttosto che qui statico...
	var populate = [{field: 'name', key: 'coach'},{field: 'name', key: 'coach2'},{field: 'nome', key: 'market'}];
		
	queryDB(model,
			query, 										//where
			fieldsquery,								 //select 
			sortby, 								//colonna da ordinare
			order,											//tipo ordinamento
			start,												//partenza
			perpage,
			populate,
			function(dati){
				var result = {}
				result.labels = labels;		
				result.documents = dati;
				callback(result);
			});
}

exports.getDocument = function(collection_name, document_id, callback) {

	var model = getModel(collection_name);
	
	queryDB(model, 
			{}, 		//where
			{},							//select
			'',							//colonna da ordinare
			'',							//tipo ordinamento
			0,							//inizio
			4,							//nelementi
			function(document_rows){
				var result = {};
				
				result.labels = ['ID', 'Nome', 'Numero Giocatori'];
				result.rows = document_rows;
				result.options = [];
				callback(result);
	});
}
	