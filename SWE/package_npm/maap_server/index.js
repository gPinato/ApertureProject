/**
 * File: index.js
 * Module: maap_server
 * Author: Alberto Garbui
 * Created: 03/05/14
 * Version: 0.2
 * Description: inizializzazione del server ed avvio
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 * 0.2 added serverInit
 ==============================================
 */
'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var controller = require('./Controller');
var DB = require('./ModelServer/Database');
var DSL = require('./ModelServer/DSL');

function serverInit(app){

	var config = app.config;

	console.log('app init...');
	
	app.set('views', config.static_assets.views);
	//app.set('view engine', 'html');

	app.use(favicon(path.join(config.static_assets.dir, 'favicon.ico')));
	
	if(config.app.env == 'development') {
		app.use(logger('dev'));
	}
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(session({ secret: config.session.secret, cookie: { maxAge: config.session.max_age} }));
	
	app.use(express.static(config.static_assets.dir));
		
	//db e config injecting
	app.use(function(req,res,next){
		//req.dbuser = DB;
		req.config = config;
		next();
	});
	
	//inizializzo le componenti del controller
	controller.init(app);
	
}

var clientSetup = function(app) {

	var config = app.config;
	
	var hostURL = config.app.host + ':' + config.app.port;
	if(config.app.ssl)
	{
		hostURL = 'https://' + hostURL;
	}else{
		hostURL = 'http://' + hostURL;
	}

	if(config.app.env == 'development')
	{
		console.log('setting up client\'s services with HOST_URL: ' + hostURL + '...');
	}else{
		console.log('setting up client...');
	}
	
	var clientServicesFolder = fs.readdirSync(config.static_assets.dir + '/scripts/services');
    clientServicesFolder.forEach(function(file) {
		
        var filePath = config.static_assets.dir + '/scripts/services/' + file;
        var stat = fs.statSync(filePath);
		var extension = path.extname(file);
        if (stat && stat.isFile() && extension == '.js') {
			
			if(config.app.env == 'development')
				console.log('found client service: ' + file);	

			var buffer = '';
			fs.readFileSync(filePath).toString().split('\n').forEach(function (line) { 
				var string2find = 'var hostURL';
				var hostURLindex = line.indexOf(string2find);
				if(hostURLindex > -1)
				{
					//se e' la riga con 'var hostURL' la modifico
					line = line.substring(0, hostURLindex + string2find.length) + ' = \'' + hostURL + '\';';				
				}
				buffer += line.toString() + '\n';
			});
			
			//rimuovo l'ultimo \n 
			buffer = buffer.substring(0, buffer.length - 1);
			
			//scrivo il file del servizio client aggiornato
			fs.writeFileSync(filePath, buffer, 'utf-8', function (err) {
				if (err) {
					console.error('error writing service file: ' + file);
					throw err;
				} 
				if(config.app.env == 'development')
					console.log(file + ' saved!');
			});	
	
		}
	});
	
	var filePath = config.static_assets.dir + '/views/login.html';
	var buffer = '';
	fs.readFileSync(filePath).toString().split('\n').forEach(function (line) { 
		var string2find = '<a  ng-show="true" href="/register">';
		var cursor = line.indexOf(string2find);
		if(cursor > -1)
		{
			//se e' la riga con 'var hostURL' la modifico
			line = line.substring(0, cursor) + '<a  ng-show="' + config.app.enableUserRegistration + '" href="/register">';			
		}
		buffer += line.toString() + '\n';
	});
	
	//rimuovo l'ultimo \n 
	buffer = buffer.substring(0, buffer.length - 1);
	
	//scrivo il file del servizio client aggiornato
	fs.writeFileSync(filePath, buffer, 'utf-8', function (err) {
		if (err) {
			console.error('error writing login.html');
			throw err;
		} 
		if(config.app.env == 'development')
			console.log(file + ' saved!');
	});	
	
}

//avvia il server 
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
	
	app.express = express;
	var protocol = config.app.ssl ? 'https' : 'http';
	var port = process.env.PORT || config.app.port;
	var app_url = protocol + '://' + config.app.host + ':' + port;
	var env = process.env.NODE_ENV ? ('[' + process.env.NODE_ENV + ']') : '[development]'; 
	
	clientSetup(app);			//configurazione client e servizi client
	DSL.init(app);				//inizializzo i DSL
	DB.init(app);				//inizializzo i database
	serverInit(app);			//inizializzo l'app express
	
	console.log('starting server...');	
		
	if(config.app.ssl)
	{
		var options = {
			key: fs.readFileSync(config.app.ssl_key),
			cert: fs.readFileSync(config.app.ssl_cert),
			requestCert: true,
			rejectUnauthorized: false
		};
		https.createServer(options, app).listen(port);
	}else{
		http.createServer(app).listen(port);
	}
	
	console.log('');
	console.log('well done! ' + config.app.title + ' listening at ' + app_url + ' ' + env);
	console.log('');

};

//export della funzione...
exports.start = start;
