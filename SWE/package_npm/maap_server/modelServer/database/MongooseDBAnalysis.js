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
var fs = require('fs');
var path = require('path'); 
var mongoose = require('mongoose');

var collectionDataPath = __dirname + '/../DSL/collectionData';

exports.init = function(app) {
	
	var config = app.config;
	var db = app.db.data;

	//per ogni collection definita tramite DSL
	//definisco i modelli (devono essere generati automaticamente dal DSL automatici dal DSL parser...)

	var modelArray = [];
	
	var list = fs.readdirSync(collectionDataPath);
	var schemaIsReady = list.length;
	
	console.log('generating models...');
	
    list.forEach(function(file) {	
	    var filePath = collectionDataPath + '/' + file;
        var stat = fs.statSync(filePath);
		var extension = path.extname(file);
		//controllo di trovare un file '*_schema.js' e carico i
        if (stat && stat.isFile() && extension == '.js' && file.indexOf('_schema') > -1) {
			var collectionName = require(collectionDataPath + '/' + file).schemaName;
			var schema = require(collectionDataPath + '/' + file).schema;	
			var wrapperSchema = {};
			wrapperSchema.name = collectionName;
			wrapperSchema.model = db.model(collectionName, schema);
			modelArray.push(wrapperSchema);
		}
		schemaIsReady--;
	});
	
	while(schemaIsReady > 0){require('deasync').sleep(100);}
	
	exports.model = modelArray;
}
