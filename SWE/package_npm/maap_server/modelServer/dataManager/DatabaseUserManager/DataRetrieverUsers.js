/**
 * File: DataRetrieverUsers.js
 * Module: maap_server::ModelServer::DataManager::DatabaseUserManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: recupero dati dal database degli utenti
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var DB = require('../../Database/MongooseDBFramework');

exports.getUsersList = function(callback) {

	callback(false);
	
}

exports.addUser = function(email, password, level, callback) {
	var criteria = new DB.users({email:email, password: password, level: level});
	var query = criteria.save(function(err){
		if(err){
			console.log('impossibile aggiungere nuovo utente: ' + err);
			callback(false);
		}else{
			console.log('registrazione ok');
			callback(true);
		}
	});
}
