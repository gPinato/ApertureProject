//front controller
'use strict';

var Dispatcher = require("./dispatcher");


var initFrontController = function(app) {

	Dispatcher.init(app);
	

}

exports.init = initFrontController;