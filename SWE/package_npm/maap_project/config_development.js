exports.app = app = {	env: 'development',		title: 'Maaperture',	description: 'MongoDB as an Admin Platform - Aperture Software',		host: 'localhost',	port: 9000,		//abilitazione connessione sicura https	ssl: false,	ssl_key: __dirname + '/ssl/maaperture.key',	ssl_cert: __dirname + '/ssl/maaperture.cert',			//configurazione servizio mail per recupero password	nodemailerConfig : {		service: "Gmail",		user: "maaperture@gmail.com",		pass: "maaperture2mailer"	},		//abilita/disabilita registrazione utente	enableUserRegistration: true}exports.adminConfig = {	usersPerPage: 20,	queriesPerPage: 2,	queriesToShow: 100,	indexesPerPage: 20}exports.session = {	secret: 'boomShakalaka!YO',	max_age: 3600000 // one hour (60s * 60m * 1000ms)}exports.userDB = {	host: 'localhost',	port: 27017,	username: '',	password: '',	db_name: 'utenti',	usersCollection: 'users',	queryCollection: 'query'}exports.dataDB = {	host: 'localhost',	port: 27017,	username: '',	password: '',	db_name: 'dati'}exports.static_assets = {	dir: __dirname + '/app',	views: __dirname + '/views',	dsl: __dirname + '/dsl'}