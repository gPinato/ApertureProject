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
var JSonComposer = require('../JSonComposer');

//controlla che la mail non sia gia presente nel sistema durante la registrazione
exports.checkMail = function(req, res) {

	console.log('controllo mail ' + req.body.field);
	console.log(JSON.stringify(req.body));
	 
	DB.users.count({
  		email: req.body.field
    }, function (err, count) {
        if (count === 0) {
			console.log('nessuna mail presente');
			res.send(304);
        } else {
			console.log('utente gia presente');
			res.send(400);
        }
    });	
};

exports.userSignup = function(req, res) {
	console.log('registrazione utente');
	console.log(JSON.stringify(req.body));
	
	var level = 0; //livello zero utente semplice	
	retriever.addUser(req.body.email, req.body.pwd1, level, function(success){
		if(success)
		{
			res.send(200);
		}else{
			res.send(400);
		}	
	});
};

//richiede la lista dei dati del proprio profilo utente
exports.sendUserProfile = function(req, res) {
	var email = req.session.passport.user.email;
	retriever.getUserProfile(email, function(user){
		res.send(JSonComposer.createUserProfile(user));
	});
};

//richiede la lista dei dati del proprio profilo per editarlo
exports.sendUserProfileEdit = function(req, res) {
	var email = req.session.passport.user.email;
	retriever.getUserProfile(email, function(user){
		res.send(JSonComposer.createUserProfileEdit(user));
	});		
};

//esegue l'aggiornamento dei dati del proprio profilo
exports.updateUserProfile = function(req, res) {

	console.log('update profile: ' + req.body);
	
	retriever.updateUserProfile(req.body, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}
	});	
};

//richiede la lista di utenti registrati
exports.getUsersList = function(req, res) {
	retriever.getUsersList(function(users){
		res.send(JSonComposer.createUsersList(users));
	});		
};

//richiede i dati di un utente per la visualizzazione
exports.sendUser = function(req, res) {
	var email = req.params.user_email;
	retriever.getUserProfile(email, function(user){
		res.send(JSonComposer.createUser(user));
	});		
};

//richiede i dati di un utente per l'edit
exports.sendUserEdit = function(req, res) {
	var email = req.params.user_email;
	retriever.getUserProfile(email, function(user){
		res.send(JSonComposer.createUser(user));
	});	
};

//esegue l'update dei dati di un utente da parte dell'admin
exports.updateUser = function(req, res) {
	console.log('update user from admin: ' + req.body);
	var email = req.params.user_email;
	retriever.updateUser(email, req.body, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}
	});	
};

//rimuove un utente
exports.removeUser = function(req, res) {
	console.log('admin is removing an user: ' + req.params.user_email);
	var email = req.params.user_email;
	retriever.removeUser(email, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}
	});	
};
