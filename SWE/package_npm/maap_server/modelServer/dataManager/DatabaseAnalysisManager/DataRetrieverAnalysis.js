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
	model.find(where, select, options, function(err, documents){
		if(err) { console.log('DataRetrieverAnalysis - query fallita!'); return; }
		if(!documents){
			console.log('nessun document presente in questa collection');
		}else{
			callback(documents);
		}
	});
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
				callback(documents);
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
			function(documents){
				console.log('documentttttttttttttttttttttttttt');
				console.log(documents);
				callback(documents);
	});
}
	