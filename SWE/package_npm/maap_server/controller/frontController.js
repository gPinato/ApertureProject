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

var dispatcher = require("./dispatcher");

var initFrontController = function(app) {

	var new_dispatcher = dispatcher.init(app);
	
	//configuro l'app per reindirizzare tutte le richieste al dispatcher
	app.use('/', new_dispatcher);

}

exports.init = initFrontController;
