//dispatcher
'use strict';

var passport = require("./passport");
var express = require("express");
var path = require('path');

var dispatcherInit = function (app) {

	//inizializzo passport
	passport.init(app);
	
	var config = app.config;

	//var dispatcher = app.express.Router();
	var dispatcher = express.Router();
	
	console.log('dispatcher**********************************' + config.static_assets.dir);

	//dispatcher.get('/api/collection/:col_id', passport.checkAuthenticated, function(req, res){
	dispatcher.get('/api/collection/:col_id', function(req, res){
		//res.sendfile(path.join(config.static_assets.dir,'colprova'+req.params.col_id+'.json'));
		console.log('D:/GitHub/ApertureProject/SWE/package_npm/maap_project/app/colprova'+req.params.col_id+'.json');
		res.sendfile('D:/GitHub/ApertureProject/SWE/package_npm/maap_project/app/colprova'+req.params.col_id+'.json')
	});
	
	//dispatcher.get('/api/collection/:col_id/:doc_id', passport.checkAuthenticated, function(req, res){
	dispatcher.get('/api/collection/:col_id/:doc_id', function(req, res){
		
		
		//res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
		console.log();
		res.sendfile('D:/GitHub/ApertureProject/SWE/package_npm/maap_project/app/docprova'+req.params.doc_id+'.json');
	});
	//dispatcher.get('/api/collection/:col_id/:doc_id/edit',passport.checkAuthenticated, function(req, res){
	dispatcher.get('/api/collection/:col_id/:doc_id/edit', function(req, res){
		//res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
		res.sendfile('C:/Users/AjK/Desktop/angularJack/app/docprova'+req.params.doc_id+'.json');
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

	//dispatcher.post('/api/login', passport.autenticate, function(req, res){
	dispatcher.post('/api/login', function(req, res){
		res.send(req.user);
	});

	dispatcher.get('*', function(req, res){
		//res.sendfile(path.join(config.static_assets.dir, 'index.html'));
		res.sendfile('C:/Users/AjK/Desktop/angularJack/app/index.html');
	});

	//ora che ho definito tutte le proprietà del dispatcher imposto l'app per usarlo
	app.use('/api', dispatcher);
}

exports.init = dispatcherInit;