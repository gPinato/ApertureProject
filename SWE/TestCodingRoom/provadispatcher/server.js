// set up ======================================================================
var express  = require('express');						// creo l'oggetto express
var app      = express(); 								// cosi creiamo la nostra applicazione con express
var port  	 = 8081; 									// imposto la porta del server

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.cookieParser()); 					// read cookies (needed for auth)
	app.use(express.bodyParser()); 						// pull information from html in POST
});

// frontController ======================================================================
require('./server/frontController.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);										//avvio il server
console.log("MaaP listening on port " + port + " :)");
