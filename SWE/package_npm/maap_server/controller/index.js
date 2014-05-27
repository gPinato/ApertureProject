//controller
'use strict';

var FrontController = require('./frontController');

exports.init = function(app){

	console.log("inizializzazione controller...");
	
	//inizializzo il frontController
	FrontController.init(app);
	
		
}

