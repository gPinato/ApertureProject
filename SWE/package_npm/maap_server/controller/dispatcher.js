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

var dispatcherInit = function (app) {

	//inizializzo passport
	passport.init(app);
	var config = app.config;
	
	var dispatcher = app.express.Router();
	
	dispatcher.get('/api/collection/list', passport.checkAuthenticated, datamanager.sendCollectionsList);
	
	dispatcher.get('/api/collection/:col_id', passport.checkAuthenticated, datamanager.sendCollection);
	
	dispatcher.get('/api/collection/:col_id/:doc_id', passport.checkAuthenticated, datamanager.sendDocument);
	
	dispatcher.get('/api/collection/:col_id/:doc_id/edit', passport.checkAuthenticated, datamanager.sendDocument);

	dispatcher.put('/api/collection/:col_id/:doc_id', function(req, res){
		console.log(JSON.stringify(req.body));
		res.send(200);
	});

	dispatcher.post('/signup', function(req, res){
		console.log(JSON.stringify(req.body));
		res.send(200);
	});

	dispatcher.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	dispatcher.post('/api/login', passport.authenticate, 
	function(req, res){
		res.send(req.user);
	});
	
	dispatcher.get('*', function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'index.html'));
	});

	return dispatcher;
}

exports.init = dispatcherInit;
