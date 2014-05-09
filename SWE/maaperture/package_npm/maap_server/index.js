//server starter ed inizializzazione
'use strict';

var express = require('express');
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

	//app.set('views', path.join(__dirname, 'app/views'));
	app.set('views', __dirname);
	//app.set('view engine', 'html');

	//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
	app.use(favicon('./public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	
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

var startServer = function(config) {

	var app = express();
	app.config = config;
		
	console.log("checking DSL...");
	
	DataManager.test1();
	DataManager.test2();	
	 
	console.log("starting nodeJS server...");
	serverInit(app);	
	
	app.set('port', process.env.PORT || 3000);
	var server = app.listen(app.get('port'));
	console.log("[nome progetto] listening on port " + server.address().port + "... :)");	
};

//export della funzione...
exports.start = startServer;

