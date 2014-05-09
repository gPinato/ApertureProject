//front controller
'use strict';

var express = require('express');
var dispatcher = express.Router();

dispatcher.get('/req', function(req, res) {
	res.sendfile("response.json");
});

dispatcher.post('/addshop', function(sReq){

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

dispatcher.all('/*', function(req, res,next) {
	// Just send the index.html for other files to support HTML5Mode
	res.sendfile('public/index.html');
	//next.sendfile("response.json");
});

//export del dispatcher...
module.exports = dispatcher;

