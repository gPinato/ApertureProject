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

	DB.users.find({}, '_id email password' ,function(err,users){
		if(err) { console.log('errore lettura users!'); return done(err); }
		if(!users){
			console.log('nessun utente presente');
		}else{
			callback(users);
		}	
	});
	
}
