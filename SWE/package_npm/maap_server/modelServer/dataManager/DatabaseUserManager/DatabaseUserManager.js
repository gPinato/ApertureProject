/**
 * File: DatabaseUserManager.js
 * Module: maap_server::modelServer::dataManager::DatabaseUserManager
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
var DB = require('../../database/MongooseDBFramework');
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

exports.userSignup = function(req, res, next) {
	console.log('registrazione utente');
	console.log(JSON.stringify(req.body));
	
	var level = 0; //livello zero utente semplice
	
	if(req.body.pwd1 != req.body.pwd2)
	{
		console.log('richiesta registrazione fallita: passwords doesn\'t match!');
		res.send(400);
	}
	
	//controllo che l'utente non sia presente
	DB.users.count({
  		email: req.body.email
    }, function (err, count) {
        if (count == 0) {
			retriever.addUser(req.body.email, req.body.pwd1, level, function(success){
				if(success)
				{
					req.body = {email: req.body.email, password: req.body.pwd1};
					next();
				}else{
					console.log('richiesta registrazione fallita: inserimento nel db fallito');
					res.send(400);
				}	
			});
        } else {
			console.log('richiesta registrazione fallita: utente gia presente');
			res.send(400);
        }
    });	
	
};

//richiede la lista dei dati del proprio profilo utente
exports.sendUserProfile = function(req, res) {
	var user_id = req.session.passport.user._id;
	retriever.getUserProfile(user_id, function(user){
		res.send(JSonComposer.createUserProfile(user));
	});
};

//req.session.passport.user        contiene _id, email, password, level

//richiede la lista dei dati del proprio profilo per editarlo
exports.sendUserProfileEdit = function(req, res) {
	var user_id = req.session.passport.user._id;
	console.log(JSON.stringify(req.session.passport.user));
	retriever.getUserProfile(user_id, function(user){
		res.send(JSonComposer.createUserProfileEdit(user));
	});		
};

//esegue l'aggiornamento dei dati del proprio profilo
exports.updateUserProfile = function(req, res) {

	console.log('update profile: ' + JSON.stringify(req.body));	
	retriever.updateUserProfile(req, function(done){
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
	console.log('get user list: ' + JSON.stringify(req.query));	
	
	//imposto i vari parametri con valori di default se nn presenti
	var page = req.query.page || 0;
	var column = req.query.column || '_id';
	var order = req.query.order || 'asc';
	var perpage = req.config.adminConfig.usersPerPage || 22;
	
	retriever.getUsersList(column, order, page, perpage, function(users){
		res.send(JSonComposer.createUsersList(users.data, users.options));
	});		
};

//richiede i dati di un utente per la visualizzazione
exports.sendUser = function(req, res) {
	console.log('getUserAdmin: ' + JSON.stringify(req.params));
	var user_id = req.params.user_id;
	retriever.getUserProfile(user_id, function(user){
		res.send(JSonComposer.createUser(user));
	});		
};

//richiede i dati di un utente per l'edit
exports.sendUserEdit = function(req, res) {
	console.log('getUserEditAdmin: ' + JSON.stringify(req.params));
	var user_id = req.params.user_id;
	retriever.getUserProfile(user_id, function(user){
		res.send(JSonComposer.createUser(user));
	});	
};

//esegue l'update dei dati di un utente da parte dell'admin
exports.updateUser = function(req, res) {
	console.log('update user from admin: ' + JSON.stringify(req.body));
	retriever.updateUser(req, function(done){
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
	console.log('admin is removing an user: ' + req.params.user_id);
	retriever.removeUser(req.params.user_id, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}
	});	
};
