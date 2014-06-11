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

	var criteria = {_id:'510c35dd8fada716c89d0017'};
	//var criteria = {email:'miotto@miotto'};
	//var newvaluefield = {email:'maso@maso'};

	var testquery = require('../../DSL/querydelete');
	testquery.provaquery(usersModel, criteria,function(dati){
						console.log('ecco qua:');
						console.log(dati);						
});
}
exports.func = func;