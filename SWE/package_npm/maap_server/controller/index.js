/**
 * File: index.js
 * Module: maap_server::controller
 * Author: Alberto Garbui
 * Created: 02/05/14
 * Version: 0.1
 * Description: inizializzazione controller
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var FrontController = require('./frontController');

exports.init = function(app){

	console.log("controller init...");
	
	//inizializzo il frontController
	FrontController.init(app);	
	
}
