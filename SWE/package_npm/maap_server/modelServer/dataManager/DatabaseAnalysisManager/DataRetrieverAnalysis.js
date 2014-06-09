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

//per ora uso DBframework..
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

var queryDBpopulate = function(model,where,select,orderbycolumn,typeorder,startskip,numberofrow,populateField,populatePath,callback){
	var options = {};
	if(orderbycolumn != '' && typeorder != ''){
		var sort = {};
		sort[orderbycolumn] = typeorder;
		options.sort = sort;
	}
	if(numberofrow!=''){
		options.limit = numberofrow;
	}
	if(startskip != ''){
		options.skip = startskip;
	}
	
	var selectPopulate = {};
	selectPopulate[populateField] = 1;
	
	if(where == undefined)console.log('where undefined');
	if(select == undefined)console.log('select undefined');
	if(options == undefined)console.log('options undefined');
	
	//populate({path:populatePath,select:selectPopulate});
	model.find(where, select, options).exec( function(err, result){
		if(err){ console.log('DataRetrieverAnalysis - query fallita'); return;}
		if(!result){
			console.log('nessun document presente in questa collection');
		}else{
			/*for(var i=0; i<result.length; i++)
			{
				var obj = result[i];
				var newfield = obj[populatePath][populateField];
				obj[populatePath] = newfield;
			}*/
			callback(result);			
		}
	});
	
}

exports.getCollectionsList = function() {
	var collectionsList = require('../../DSL/collectionData/collectionsList.json');
	return collectionsList;
}

exports.getDocumentsList = function(collection_name, column, order, page, callback) {

	var model = getModel(collection_name);
	
	var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
	var columns = collection.index.column;
	var labels = [];
	for(var i = 0; i<columns.length; i++) {
		labels[i] = columns[i].label;
	}
	
	//TODO decidere quando usare le impostazioni che arrivano dal client e quando 
	//quelle definite nel dsl (la prima volta..)
	//column = collection.index.sortby;
	//order = collection.index.order;
	
	var perpage = collection.index.perpage;
	
	var query;
	if(collection.index.query === null)
		query = {};
	else
		query = collection.index.query;
	
	/*queryDBpopulate(	model, 
						{},//query, 		//where
						{},			//select
						column,		//colonna da ordinare
						order,		//tipo ordinamento
						0,			//inizio
						4,//perpage,	//nelementi
						'name',		//populate field
						'coach',	//populate path
						function(documents){
				
							var result = {};
				
							result.labels = labels;
							result.documents = documents;
							result.options = [];
						
							callback(result);
	});*/
	
	var result = {};
	result.labels = labels;
	result.documents = [];
	result.documents[0] = {_id: '3di33e93e93', name: 'ciao', number_players: 33, coach_name: 'pop', coach2_name: 'io', market_nome: 's'};
	result.documents[1] = {_id: '398e93d9d38', name: 'ciao', number_players: 33, coach_name: 'pop', coach2_name: 'io', market_nome: 's'};
	callback(result);
	
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
	