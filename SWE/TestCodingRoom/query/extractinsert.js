var func = function(){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/utenti');
	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		});
	var schema = require('../../DSL/schemaprova.js');
	
	var usersSchema = schema.usersSchema;
	var usersModel = db.model('users', usersSchema);

	var criteria = new usersModel({email:'hh@hh.com', password:'hh'});
	//var criteria = {email:'miotto@miotto'};
	//var newvaluefield = {email:'maso@maso'};

	var testquery = require('../../DSL/queryinsert');
	testquery.provaquery(usersModel, criteria,function(dati){
						console.log('ecco qua:');
						console.log(dati);						
});
}
exports.func = func;