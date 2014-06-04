var provaquery=function query(namecollection,orderbycolumn,typeorder,numberofrow,callback){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/dati');
	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		});
	var schema = require('./schemaprova.js');
	var teamsSchema = schema.teamsSchema;
	var teamsModel = db.model('teams', teamsSchema);
	var orderbycolumn='name';
	var options = {
		"limit" : numberofrow,
		"skip" : 0,
		"sort" : {orderbycolumn:typeorder}
	}
	teamsModel.find({},'',options, function(err,result){
		if(err)
			console.log('query fallita');
		else{
				callback(result);
		}
	});
}
exports.provaquery = provaquery;