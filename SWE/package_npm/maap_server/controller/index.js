//controller
'use strict';

var FrontController = require('./frontController');
var passport = require('./passport');

exports.init = function(app){

	console.log("inizializzazione controller...");
	
	app.use('/', FrontController);
	
	//inizializzo passport
	passport.init(app);	
}

