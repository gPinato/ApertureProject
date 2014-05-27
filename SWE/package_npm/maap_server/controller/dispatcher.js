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
'use strict';

var passport = require("./passport");
var path = require('path');

var dispatcherInit = function (app) {

	//inizializzo passport
	passport.init(app);
	var config = app.config;
	
	var dispatcher = app.express.Router();
	
	dispatcher.get('/api/collection/:col_id', passport.checkAuthenticated, function(req, res){
		res.sendfile(path.join(config.static_assets.dir,'colprova'+req.params.col_id+'.json'));
	});
	
	dispatcher.get('/api/collection/:col_id/:doc_id', passport.checkAuthenticated, function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
	});
	
	dispatcher.get('/api/collection/:col_id/:doc_id/edit', passport.checkAuthenticated, function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
	});
	
	dispatcher.put('/api/collection/:col_id/:doc_id', function(req, res){
		console.log(JSON.stringify(req.body));
		res.send(200);
	});

	dispatcher.post('/api/signup', function(req, res){
		console.log(JSON.stringify(req.body));
		res.send(200);
	});

	dispatcher.get('/api/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	dispatcher.post('/api/login', passport.passport.authenticate('local'), 
	function(req, res){
		res.send(req.user);
	});
	
	//dispatcher.post('api/login', passport.passport.authenticate('local', { successRedirect: '/',
     //                                               failureRedirect: '/api/login' }));
	
	dispatcher.get('*', function(req, res){
		res.sendfile(path.join(config.static_assets.dir, 'index.html'));
	});

	return dispatcher;
}

exports.init = dispatcherInit;
