/**
 * File: DatabaseUserManager.js
 * Module: maap_server::ModelServer::DataManager::DatabaseUserManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: gestione dati dal database degli utenti
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var retriever = require('./DataRetrieverUsers');

//esempio richiesta lista di utenti registrati
exports.userList  = function(req, res) {
	var config = req.config;
		
	//NB. il recupero dei dati sul db è asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getUsersList(function(users){
	
		console.log(users);
	
		//res.send(JSonComposer.createUsersList(users));
			
	});	
}