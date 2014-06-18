/**
 * File: dispatcher.js
 * Module: maap_server::Controller
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
'use strict';

var passport = require("./Passport");
var path = require('path');
var datamanager = require('../ModelServer/DataManager/DatabaseAnalysisManager/DatabaseAnalysisManager');
var usermanager = require('../ModelServer/DataManager/DatabaseUserManager/DatabaseUserManager');
var indexmanager = require('../ModelServer/DataManager/IndexManager/IndexManager');

var dispatcherInit = function (app) {
	
	//inizializzo passport
	passport.init(app);
	var config = app.config;
	
	var dispatcher = app.express.Router();
	
	//gestione collections e documents
	dispatcher.get('/api/collection/list', passport.checkAuthenticated, datamanager.sendCollectionsList);
	//dispatcher.get('/api/collection/list', passport.checkAuthenticated, indexmanager.createIndex);
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
	dispatcher.delete('/api/queries', passport.checkAuthenticatedAdmin, datamanager.resetQueries);
	
	//gestione indici nel db di analisi
	dispatcher.get('/api/indexes/list', passport.checkAuthenticatedAdmin, datamanager.getIndexesList);
	dispatcher.post('/api/indexes', passport.checkAuthenticatedAdmin, datamanager.createIndex);
	dispatcher.delete('/api/indexes/:index_name', passport.checkAuthenticatedAdmin, datamanager.deleteIndex);
	
	//gestione login
	dispatcher.post('/api/check/email', passport.checkNotAuthenticated, usermanager.checkMail);	
	dispatcher.post('/api/signup', passport.checkNotAuthenticated, usermanager.userSignup);
	dispatcher.get('/loggedin', function(req, res){
		res.send(req.isAuthenticated() ? req.user : '0');
	});
	dispatcher.post('/api/login', passport.checkNotAuthenticated, passport.authenticate, function(req, res){
		res.send(req.user);
	});	
	dispatcher.get('/api/logout', passport.checkAuthenticated, function(req, res){
		req.logout();
		res.send(200);
	});
	
	//per tutte le altre richieste... c'e' sempre il dispatcher!	
	dispatcher.get('*', function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'index.html'));
	});

	return dispatcher;
}

exports.init = dispatcherInit;
