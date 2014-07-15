/**
 * File: dispatcher.js
 * Module: maap_server::controller
 * Author: Alberto Garbui
 * Created: 03/05/14
 * Version: 0.1
 * Description: inizializzazione dispatcher
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';//mostra tutti i warning possibili

var passport = require("./passport");
var path = require('path');
var datamanager = require('../modelServer/dataManager/DatabaseAnalysisManager/DatabaseAnalysisManager');
var usermanager = require('../modelServer/dataManager/DatabaseUserManager/DatabaseUserManager');
var indexmanager = require('../modelServer/dataManager/IndexManager/IndexManager');

 /**
 *Gestisce le richieste del client, effettuando i controllo di autenticazioni
 *
 *@param app contiene il middleware express
 *@return dispatcher ritorna il dispatcher creato 
 */
var dispatcherInit = function (app) {
	
	//inizializzo passport
	passport.init(app);
	var config = app.config;
	
	//creo il dispatcher (router di express)
	var dispatcher = app.express.Router();
	
	//gestione collections e documents
	dispatcher.get('/api/collection/list', passport.checkAuthenticated, datamanager.sendCollectionsList);
	//dispatcher.get('/api/collection/list/:find', passport.checkAuthenticated, datamanager.sendCollectionsList);
	dispatcher.get('/api/collection/:col_id', passport.checkAuthenticated, datamanager.sendCollection);
	dispatcher.get('/api/collection/:col_id/:doc_id', passport.checkAuthenticated, datamanager.sendDocument);
	dispatcher.get('/api/collection/:col_id/:doc_id/edit', passport.checkAuthenticatedAdmin, datamanager.sendDocumentEdit);
	dispatcher.put('/api/collection/:col_id/:doc_id/edit', passport.checkAuthenticatedAdmin, datamanager.updateDocument);
	dispatcher.delete('/api/collection/:col_id/:doc_id/edit', passport.checkAuthenticatedAdmin, datamanager.removeDocument);

	//gestione profilo
	dispatcher.get('/api/profile', passport.checkAuthenticated, usermanager.sendUserProfile);
	dispatcher.get('/api/profile/edit', passport.checkAuthenticated, usermanager.sendUserProfileEdit);
	dispatcher.put('/api/profile/edit', passport.checkAuthenticated, usermanager.updateUserProfile);
	
	//gestione utenti
	dispatcher.get('/api/users/list', passport.checkAuthenticatedAdmin, usermanager.getUsersList);
	dispatcher.get('/api/users/:user_id', passport.checkAuthenticatedAdmin, usermanager.sendUser);
	dispatcher.get('/api/users/:user_id/edit', passport.checkAuthenticatedAdmin, usermanager.sendUserEdit);
	dispatcher.put('/api/users/:user_id/edit', passport.checkAuthenticatedAdmin, usermanager.updateUser);
	dispatcher.delete('/api/users/:user_id/edit', passport.checkAuthenticatedAdmin, usermanager.removeUser);
	
	//gestione query piu utilizzate
	dispatcher.get('/api/queries/list', passport.checkAuthenticatedAdmin, datamanager.getTopQueries);
	dispatcher.delete('/api/queries/list', passport.checkAuthenticatedAdmin, datamanager.resetQueries);
	
	//gestione indici nel db di analisi
	dispatcher.get('/api/indexes', passport.checkAuthenticatedAdmin, datamanager.getIndexesList);
	dispatcher.put('/api/indexes', passport.checkAuthenticatedAdmin, datamanager.createIndex);
	dispatcher.delete('/api/indexes/:col_name/:index_name', passport.checkAuthenticatedAdmin, datamanager.deleteIndex);
		
	//registrazione nuovo utente per l'admin
	dispatcher.put('/api/signup', passport.checkAuthenticatedAdmin, usermanager.userSignup, function(req, res){
		res.send(200);
	});
	
	//gestione login
	dispatcher.post('/api/forgot', passport.checkNotAuthenticated, passport.forgotPassword);	
	dispatcher.post('/api/check/email', passport.checkNotAuthenticated, usermanager.checkMail);
	dispatcher.post('/api/signup', passport.checkNotAuthenticated, usermanager.userSignup, passport.authenticate, function(req, res){
		console.log(req.user);
		res.send(req.user);
	});
	
	dispatcher.post('/api/login', passport.checkNotAuthenticated, passport.authenticate, function(req, res){
		console.log(req.user);
		res.send(req.user);
	});	
	dispatcher.get('/api/logout', passport.checkAuthenticated, function(req, res){
		req.session.destroy(function(err){
			//req.logout();
			res.send(200);
		});
	});
	
	//per tutte le altre richieste... c'e' sempre il dispatcher!	
	//(qualsiasi richiesta che non inizia con /api/... arrivera' qui e come risposta sara' inviato il file index.html.
	//sara' poi il client a caricare angular, tutti i controllers e relativi servizi)
	dispatcher.get('*', function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'index.html'));
	});

	//restituisco il dispatcher inizializzato e configurato
	return dispatcher;
}

exports.init = dispatcherInit;
