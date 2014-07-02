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

var controller = require('./controller');
var DB = require('./modelServer/database');
var DSL = require('./modelServer/DSL');

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
	app.use(function(req, res, next){
		req.dataDB = app.db.data;
		req.userDB = app.db.users;
		req.config = config;
		next();
	});
	
	//inizializzo le componenti del controller
	controller.init(app);
	
}

//cambia una riga del file specificato sostituendola con quella passata in ingresso
//filePath = path del file da modificare
//string2find = stringa con la quale inizia la riga da modificare
//newString = stringa con i nuovi caratteri da aggiungere 
//restituisce true se ha trovato la stringa
var changeFileRow = function(filePath, string2find, newString) {
	
	var buffer = '';
	var found = false;
	fs.readFileSync(filePath).toString().split('\n').forEach(function (line) { 
		
		var cursor = line.indexOf(string2find);
		if(cursor > -1)
		{
			line = line.substring(0, cursor) + newString;		
			found = true;
		}
		buffer += line.toString() + '\n';
	});
	
	//rimuovo l'ultimo \n 
	buffer = buffer.substring(0, buffer.length - 1);
	
	//scrivo il file aggiornato
	if(found)
	{
		fs.writeFileSync(filePath, buffer, 'utf-8', function (err) {
			if (err) {
				console.error('error updating file: ' + filePath);
				throw err;
			} 
			if(config.app.env == 'development')
				console.log(file + ' saved!');
				
			return true;
			
		});	
	}else{
		return false;
	}
	
};

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

			changeFileRow(	filePath, 
							'var hostURL',
							'var hostURL = \'' + hostURL + '\';'
						);	
		}
	});
	
	//abilito/disabilito la registrazione
	if(!changeFileRow(	config.static_assets.dir + '/views/login.html', 
						'<a ng-show="true" href="/register">',
						'<a ng-show="' + config.app.enableUserRegistration + '" href="/register">'
					))
	{
		changeFileRow(	config.static_assets.dir + '/views/login.html', 
						'<a ng-show="false" href="/register">',
						'<a ng-show="' + config.app.enableUserRegistration + '" href="/register">'
					);
	}
	
	//imposto il nome del progetto nel file index.html
	changeFileRow(	config.static_assets.dir + '/index.html',
					'<title>',
					'<title>' + config.app.title + '</title>'
				);
	
	//imposto la descrizione del progetto nel file index.html
	changeFileRow(	config.static_assets.dir + '/index.html',
					'<meta name="description" content="',
					'<meta name="description" content="' + config.app.description + '">'	
				);
					
	//abilito/disabilito creazione degli indici
	if(!changeFileRow(	config.static_assets.dir + '/views/queryCollection.html',
						'<td><a ng-show="true" href="" class="btn btn-info btn-sm" ng-click="createIndex(data[$index]._id)" ><i class="glyphicon glyphicon-ok"></i> Create Index</a></td>',
						'<td><a ng-show="' + config.adminConfig.enableIndexCreation + '" href="" class="btn btn-info btn-sm" ng-click="createIndex(data[$index]._id)" ><i class="glyphicon glyphicon-ok"></i> Create Index</a></td>'	
					))
	{
		changeFileRow(	config.static_assets.dir + '/views/queryCollection.html',
						'<td><a ng-show="false" href="" class="btn btn-info btn-sm" ng-click="createIndex(data[$index]._id)" ><i class="glyphicon glyphicon-ok"></i> Create Index</a></td>',
						'<td><a ng-show="' + config.adminConfig.enableIndexCreation + '" href="" class="btn btn-info btn-sm" ng-click="createIndex(data[$index]._id)" ><i class="glyphicon glyphicon-ok"></i> Create Index</a></td>'	
				);	
	}
	
};

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
	
	DSL.init(app);				//inizializzo i DSL
	DB.init(app);				//inizializzo i database
	clientSetup(app);			//configurazione client e servizi client
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
