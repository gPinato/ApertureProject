exports.app = app = {	env: 'production',		title: 'Maaperture',	description: 'MongoDB as an Admin Platform - Aperture Software',		host: 'localhost',	port: 9000,		ssl: false,	ssl_key: __dirname + '/ssl/maaperture.key',	ssl_cert: __dirname + '/ssl/maaperture.cert',			nodemailerConfig : {		service: "Gmail",		user: "maaperture@gmail.com",		pass: "maaperture2mailer"	},		enableUserRegistration: true}exports.adminConfig = {	usersPerPage: 20,	queriesPerPage: 20,	indexesPerPage: 20}exports.session = {	secret: 'boomShakalaka!YO',	max_age: 3600000 // one hour (60s * 60m * 1000ms)}exports.userDB = {	host: 'localhost',	port: 27018,	username: '',	password: '',	db_name: 'utenti',	usersCollection: 'users',	queryCollection: 'query'}exports.dataDB = {	host: 'localhost',	port: 27018,	username: '',	password: '',	db_name: 'dati'}exports.static_assets = {	dir: __dirname + '/app',	views: __dirname + '/views',	dsl: __dirname + '/dsl'}