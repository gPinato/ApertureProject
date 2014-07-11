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
'use strict';//mostra tutti i warning possibili

var frontController = require('./frontController');

 /**
 *Viene inizializzato il front controller passandogli l'app di express.
 *
 *@param app contiene il middleware express
 */
exports.init = function(app){

	console.log("controller init...");
	
	//inizializzo il frontController
	frontController.init(app);	
	
}
