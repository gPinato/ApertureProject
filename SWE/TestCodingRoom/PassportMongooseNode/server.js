// set up ======================================================================
var express  = require('express');						// creo l'oggetto express
var app      = express(); 								// cosi creiamo la nostra applicazione con express
var mongoose = require('mongoose'); 					// creo un oggetto mongoose per connettermi a mongoDB
var port  	 = process.env.PORT || 8080; 				// imposto la porta del server
var database = require('./config/database'); 			// carico la configurazione del database di mongo

var passport = require('passport');						// oggetto passport
var mongooseUser = require('mongoose'); 				// mongoose per l'account utenti
var databaseUser = require('./config/databaseUser'); 	// carico la configurazione del db degli utenti
var flash = require('connect-flash');					//	messaggi flash usati per l'autenticazione... 

// configuration ===============================================================
mongoose.connect(database.url); 	// connetto il database di mongoDB (dati) con mongoose
//mongooseUser.connect(databaseUser.url); 	// connetto il database di mongoDB (utenti) con mongoose

//configurazione di passport, gli passo l'oggetto passport creato in precedenza cosi posso configurarlo
require('./config/passport')(passport);
//ora che è configurato potrò passarlo al router...

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.cookieParser()); 						// read cookies (needed for auth)
	app.use(express.bodyParser()); 							// pull information from html in POST
	//app.use(express.methodOverride()); 						// simulate DELETE and PUT
	
	app.set('view engine', 'ejs'); 							// set up ejs for templating, equivalente di JADE
	
	//configurazioni necessarie per passport
	app.use(express.session({secret : 'yeahhhDAPTeam!MongoAdminAsBlaBla'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());	
	
});

// routes ======================================================================
require('./app/routes.js')(app, passport);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("MaaP listening on port " + port + " :)");
