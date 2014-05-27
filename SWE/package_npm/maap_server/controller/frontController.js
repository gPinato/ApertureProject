/**
 * File: frontController.js
 * Module: maap_server::controller
 * Author: Alberto Garbui
 * Created: 03/05/14
 * Version: 0.1
 * Description: inizializzazione front controller
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var Dispatcher = require("./dispatcher");

var initFrontController = function(app) {

	var dispatcher = Dispatcher.init(app);
	
	//configuro l'app per reindirizzare tutte le richieste al dispatcher
	app.use('/', dispatcher);

}

exports.init = initFrontController;
