//TODO aggiungere intestazione 
//file di configurazione del progetto

'use strict';

var config = {
	port: 3000,
	static: __dirname + "/public",
	dslPath: __dirname + "/dsl",
	
	verboseLog: true,
	
	jk: "questa è una configurazione",
	test: "questo un altro parametro..."
};

module.exports.config = config;