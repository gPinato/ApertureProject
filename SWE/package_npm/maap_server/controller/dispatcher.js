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
	
	//console.log('dispatcher**********************************' + config.static_assets.dir);

	dispatcher.get('/collection/:col_id', passport.checkAuthenticated, function(req, res){
		res.sendfile(path.join(config.static_assets.dir.replace(/\\/g, "/")+'/colprova'+req.params.col_id+'.json'));
	});
	
	dispatcher.get('/collection/:col_id/:doc_id', passport.checkAuthenticated, function(req, res){
		res.sendfile(config.static_assets.dir.replace(/\\/g, "/")+'/docprova'+req.params.doc_id+'.json');
	});
	dispatcher.get('/collection/:col_id/:doc_id/edit',passport.checkAuthenticated, function(req, res){
		res.sendfile(config.static_assets.dir.replace(/\\/g, "/")+'/docprova'+req.params.doc_id+'.json');
	});
	
	

	dispatcher.put('/collection/:col_id/:doc_id', function(req, res){
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

	dispatcher.post('/login', passport.authenticate, function(req, res){
		res.send(req.user);
	});

	dispatcher.get('/', function(req, res){
		res.sendfile(config.static_assets.dir.replace(/\\/g, "/")+'/index.html');
	});

	//ora che ho definito tutte le proprietà del dispatcher imposto l'app per usarlo
	app.use('/api', dispatcher);
}

exports.init = dispatcherInit;