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
var DB = require('../../Database/MongooseDBAnalysis');

var getModel = function(collection_name) {
	var array = DB.model;
	
	for(var i=0; i<array.length; i++)
	{
		console.log(array[i].name);
		if(array[i].name === collection_name)
		{
			return array[i].model;
		}
	}
	return -1;
}

var queryDB = function (model, where, select, orderbycolumn, typeorder, startskip, numberofrow, callback){
	var options = {};
	if(orderbycolumn != '' && typeorder != '')
	{
		var sort = {};
		sort[orderbycolumn] = typeorder;
		options.sort = sort;
	}
	if(numberofrow != '')
	{
		options.limit = numberofrow;
	}
	if(startskip != '')
	{
		options.skip = startskip;
	}
	model.find(where, select, options).populate('coach','name').lean().exec(function(err, documents){
		if(err) { console.log('DataRetrieverAnalysis - query fallita!'); return; }
		if(!documents){
			console.log('nessun document presente in questa collection');
		}else{
			documents[0].coach = 'cippo';
			documents[0].name = 'cippo2';
			console.log(documents);
			callback(documents);
		}
	});
}

exports.getCollectionsList = function() {
	var collectionsList = require('../../DSL/collectionData/collectionsList.json');
	
	var collectionsArray = [];
	for(var i=0; i<collectionsList.length; i++)
	{
		collectionsArray.push(collectionsList[i].name);
		//collectionsArray.push(collectionsList[i].label); //bisogna inviare le labels e nomi 
	}
	return collectionsArray;
}

exports.getDocumentsList = function(collection_name, column, order, page, callback) {

	var model = getModel(collection_name);
	
	queryDB(model, 
			{}, 		//where
			{},			//select
			column,		//colonna da ordinare
			order,		//tipo ordinamento
			0,			//inizio
			4,			//nelementi
			function(documents){
				
				var result = {};
				
				result.labels = ['ID', 'Squadra', 'giocatori', 'coach'];
				result.documents = documents;
				result.options = [];
				
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
	