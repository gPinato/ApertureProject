/**
 * File: MongooseDBAnalysis.js
 * Module: maap_server::modelServer::database
 * Author: Alberto Garbui
 * Created: 23/05/14
 * Version: 0.1
 * Description: gestione db di analisi
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var mongoose = require('mongoose');

exports.init = function(app) {
	
	var config = app.config;
	var db = app.db.data;
	var collectionsList = require('../DSL/collectionData/collectionsList.json');
		
	//per ogni collection definita tramite DSL
	//definisco i modelli (devono essere generati automaticamente dal DSL automatici dal DSL parser...)

	var modelArray = [];
		
	for(var i=0; i<collectionsList.length; i++)
	{
		var collectionName = collectionsList[i].name;
		var schema = require(collectionsList[i].schema_file).schema;	
		var wrapperSchema = {};
		wrapperSchema.name = collectionName;
		wrapperSchema.model = db.model(collectionName, schema);
		modelArray.push(wrapperSchema);
	}
	
	exports.model = modelArray;
}
