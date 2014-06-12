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

var path = require('path');
var retriever = require('./DataRetrieverUsers');
var DB = require('../../Database/MongooseDBFramework');

//controlla che la mail non sia gia presente nel sistema durante la registrazione
exports.checkMail = function(req, res) {

	console.log('controllo mail ' + req.body.field);
	console.log(JSON.stringify(req.body));
	
	DB.users.count({
  		email: req.body.field
    }, function (err, count) {
        if (count === 0) {
			console.log('nessuna mail presente');
			res.send(401);
        } else {
			console.log('utente gia presente');
			res.send(304);
        }
    });	
}

exports.userSignup = function(req, res) {
	console.log('registrazione utente');
	console.log(JSON.stringify(req.body));
	
	var level = 0; //livello zero utente semplice
	
	retriever.addUser(req.body.email, req.body.pwd1, level, function(success){
		if(success)
		{
			res.send(304);
		}else{
			res.send(401);
		}	
	});
}

//esempio richiesta lista di utenti registrati
exports.userList  = function(req, res) {
	var config = req.config;
		
	//NB. il recupero dei dati sul db � asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getUsersList(function(users){
	
		console.log(users);
	
		//res.send(JSonComposer.createUsersList(users));
			
	});	
}