//server starter ed inizializzazione
'use strict';

var express = require('express');
//var mongoose = require('mongoose')
var DataManager = require('./modelServer/dataManager');
//var DSL = require('./modelServer/DSL');
//var DB = require('./modelServer/database');

function serverInit(app){

	if (app.config.verboseLog) {
		app.use(express.logger());
	}
		
	//app.use(express.methodOverride());
	app.use(express.cookieParser("boomShakalaka!"));	
	if (app.config.port && app.config.static) {
		app.use(express.static(app.config.static));	// set the static files location 
	}
	app.use(express.bodyParser()); 				// pull information from html in POST
	app.use(express.json());       				// to support JSON-encoded bodies
	app.use(express.urlencoded()); 				// to support URL-encoded bodies

	// frontController ======================================================================
	app.get('/req', function(req, res) {
		//res.sendfile(app.config.static + "/response.json");
		res.sendfile("public/response.json");
	});

	app.post('/addshop', function(sReq){

		var temp= sReq.body.text;
		//var durr = sReq.body.param(asd);
		console.log(temp);
		//console.log("Unserialized request: " + sReq.body);
	/*
		var id = sReq.body.id,
			title = sReq.body.title,
			des = sReq.body.description,
			price = sReq.body.price;
		/*
		var data = JSON.parse();  //parse the JSON
		data.employees.push({        //add the employee
			firstName:"Mike",
			lastName:"Rut",
			time:"10:00 am",
			email:"rut@bah.com",
			phone:"800-888-8888",
			image:"images/mike.jpg"
		});
		txt = JSON.stringify(data);*/


	});


	app.all('/*', function(req, res,next) {
		// Just send the index.html for other files to support HTML5Mode
		res.sendfile('public/index.html');
		//next.sendfile("response.json");
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
	
	app.listen(config.port);	
	console.log("[nome progetto] listening on port " + config.port + "... :)");		
};

//export della funzione...
exports.start = startServer;

