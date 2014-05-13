//server starter ed inizializzazione
'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var mongoose = require('mongoose')
var DataManager = require('./modelServer/dataManager');
//var DSL = require('./modelServer/DSL');
//var DB = require('./modelServer/database');
var FrontController = require('./controller/frontController');

function serverInit(app){

	var config = app.config;
	
	app.set('views', config.static_assets.views);
	//app.set('view engine', 'html');

	app.use(favicon(path.join(config.static_assets.dir, 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(config.static_assets.dir));
	
	
	// Make our db accessible to our router
	// l'altro gruppo l'ha chiamata appInjector, 
	// dovrebbe iniettare il riferiemnto al db dentro la richiesta
	// cosi da poter accedere a db piu facilmente...
	//app.use(function(req,res,next){
	//	req.db = db;
	//	next();
	//});

	app.use('/', FrontController);
	
	// catch 404 and forwarding to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

}

var start = function(config) {

	var app = express();
	var protocol = config.app.ssl ? 'https' : 'http';
	var port = process.env.PORT || config.app.port;
	var app_url = protocol + '://' + config.app.host + ':' + port;
	var env = process.env.NODE_ENV ? ('[' + process.env.NODE_ENV + ']') : '[development]'; 
	
	console.log('app init... ' + config.session.secret);
			
	DataManager.test1();
	DataManager.test2();	
	 
	console.log('pippo app init...');
	app.config = config;
	serverInit(app);
	
	console.log('starting server...');	
	app.set('port', port);
	var server = app.listen(app.get('port'));
	console.log(config.app.title + ' listening at ' + app_url + ' ' + env);
};

//export della funzione...
exports.start = start;

