/**
 * File: IndexManager.js
 * Module: maap_server::ModelServer::DataManager::IndexManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: gestione indici
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

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

exports.addQuery = function(collection_name, select, callback) {
	var queryModel = require('../../Database/MongooseDBFramework').query;
	

}

exports.getQueries = function(n_elements, callback) {
	var DB = require('../../Database/MongooseDBFramework');

}

exports.createIndex = function(query_id, callback) {

	var model = getModel('teams');
	
}

exports.deleteIndex = function(index_id, callback) {


	var model = getModel('teams');
}
