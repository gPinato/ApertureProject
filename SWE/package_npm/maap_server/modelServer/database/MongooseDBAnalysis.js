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
	var usersCollection = config.userDB.usersCollection;
	var queryCollection = config.userDB.queryCollection;		

	//definisco i modelli (devono essere generati automaticamente dal DSL automatici dal DSL parser...)
	//exports.data = db.model(usersCollection, LocalUserSchema);		
	//Query = db.model(queryCollection, QuerySchema);
	
}
