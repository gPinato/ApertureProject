var testquery = require('./query');
testquery.provaquery('teams',"name",'desc',4,function(data){
	console.log(data);
});