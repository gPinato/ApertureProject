//server starter ed inizializzazione
'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var controller = require('./controller');
//var modelServer = require('./modelServer');
var DSL = require('./modelServer/DSL/DSLManager');
var DB = require('./modelServer/database');

function serverInit(app){

	var config = app.config;
	
	app.set('views', config.static_assets.views);
	//app.set('view engine', 'html');

	app.use(favicon(path.join(config.static_assets.dir, 'favicon.ico')));
	
	if(config.app.env == 'development') {
		app.use(logger('dev'));
	}
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

	//inizializzo il controller (passport)
	controller.init(app);
	
}

var start = function(config) {

	console.log('');
	console.log('  --------------------------------------------------');
	console.log('   ' + config.app.title);
	console.log('');
	console.log('   ' + config.app.description);
	console.log('  --------------------------------------------------');
	console.log('');
	
	var app = express();
	app.config = config;
	var protocol = config.app.ssl ? 'https' : 'http';
	var port = process.env.PORT || config.app.port;
	var app_url = protocol + '://' + config.app.host + ':' + port;
	var env = process.env.NODE_ENV ? ('[' + process.env.NODE_ENV + ']') : '[development]'; 
	
	console.log('checking dsl... ');
	DSL.checkDSL(app);
	
	console.log('');
	console.log('databases init... ');
	DB.init(app);
	
	console.log('');
	console.log('app init...');
	serverInit(app);
	
	console.log('starting server...');	
	app.set('port', port);
	var server = app.listen(app.get('port'));
	console.log('');
	console.log('well done! ' + config.app.title + ' listening at ' + app_url + ' ' + env);
	console.log('');
};

//export della funzione...
exports.start = start;
