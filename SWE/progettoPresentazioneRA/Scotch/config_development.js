exports.app = app = {
	env: 'development',
		
	title: 'Scotch',
	description: 'created with Maaperture - MongoDB as an Admin Platform - Aperture Software',
	
	host: '192.168.1.xx',
	port: 9000,
	
	//abilitazione connessione sicura https
	ssl: false,
	ssl_key: __dirname + '/ssl/maaperture.key',
	ssl_cert: __dirname + '/ssl/maaperture.cert',
		
	//configurazione servizio mail per recupero password
	nodemailerConfig : {
		service: "Gmail",
		user: "maaperture@gmail.com",
		pass: "maaperture2mailer"
	},
	
	//abilita/disabilita registrazione utente
	enableUserRegistration: true
	
}

exports.adminConfig = {

	usersPerPage: 20,
	
	queriesPerPage: 20,
	queriesToShow: 100,
	
	indexesPerPage: 20,
	
	//abilita/disabilita creazione indici nel db di analisi
	enableIndexCreation: true
	
}

exports.session = {
	secret: 'boomShakalaka!YO',
	max_age: 3600000 // one hour (60s * 60m * 1000ms)
}

exports.userDB = {
	host: 'ds039017.mongolab.com',
	port: 39017,
	username: 'admin',
	password: 'apertureadmin',
	db_name: 'dbframework',
	usersCollection: 'users',
	queryCollection: 'query'
}

exports.dataDB = {
	host: 'ds045897.mongolab.com',
	port: 45897,
	username: 'admin',
	password: 'apertureadmin',
	db_name: 'dbanalysis'
}

exports.static_assets = {
	dir: __dirname + '/app',
	views: __dirname + '/views',
	dsl: __dirname + '/dsl'
}
