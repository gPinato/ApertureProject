exports.app = app = {	env: 'development',	title: 'Maaperture',	description: 'MongoDB as an Admin Platform - Aperture Software',	host: 'localhost',	port: 9000,	ssl: false}exports.adminConfig = {	usersPerPage: 20,	queriesPerPage: 20,	indexesPerPage: 20}exports.session = {	secret: 'boomShakalaka!YO',	max_age: 3600000 // one hour (60s * 60m * 1000ms)}exports.userDB = {	host: 'localhost',	port: 27017,	db_name: 'utenti',	usersCollection: 'users',	queryCollection: 'query'}exports.dataDB = {	host: 'localhost',	port: 27017,	db_name: 'dati'}exports.static_assets = {	dir: __dirname + '/app',	views: __dirname + '/views',	dsl: __dirname + '/dsl'}