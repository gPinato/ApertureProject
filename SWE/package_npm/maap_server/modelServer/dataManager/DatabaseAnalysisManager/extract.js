var extractfield = function extract(namecollection){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/dati');
	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		});
	var schema = require('../../DSL/schemaprova.js');
	var teamsSchema = schema.teamsSchema;
	var teamsModel = db.model('teams', teamsSchema);
	
	var collection = require('../../DSL/collectionData/'+namecollection+'.json').collection;
	var columns = collection.index.column;
	var labelcolumns=[];
	for(var i = 0; i<columns.length;i++){
		labelcolumns[i]=columns[i].label;
	}//for
	
	var fieldsquery = '';
	var i = 0;
	for(; i<columns.length-1;i++){
		fieldsquery+=columns[i].name+': 1,';
	}//for
	
	fieldsquery+=columns[i].name+': 1';
	var sortby = collection.index.sortby;
	var order = collection.index.order;
	var perpage = collection.index.perpage;
	var query;
	if(collection.index.query===null)
		query = {};
	else
		query = collection.index.query;
	//console.log('name: '+namecollection);
	

	var testquery = require('../../DSL/query');
	testquery.provaquery(teamsModel,
					query, 											//where
					{},								 //select 
					sortby, 								//colonna da ordinare
					order,											//tipo ordinamento
					0,												//partenza
					perpage,												//numero elementi
					function(dati){
						var result = {}
						result.label = labelcolumns;
						result.dati = dati;
						console.log(result);//callback
});
}//end function
exports.extractfield = extractfield;