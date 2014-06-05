var mongoose = require('mongoose');

var membersIndex = new mongoose.Schema({
name: { type: String },
number_players: { type: Number, min: 23, max:35 }
});

var membersShow =  new mongoose.Schema({
name: { type: String },
number_players: { type: Number, min: 23, max:35 },
name: { type: String },
surname: { type: String },
email: { type: String },
age: { type: Number, min: 18, max:70 }
});

var LocalUserSchema = new mongoose.Schema({
	email: { 
			type: String, 
			required: true
	},
	password: {
		type: String
	}
});


var teamsSchema = new mongoose.Schema({
name: { type: String },
number_players: { type: Number, min: 23, max:35 },
coach: {
	name: { type: String },
	surname: { type: String },
	email: { type: String },
	age: { type: Number, min: 18, max:70 }
}
});



//var schema = LocalUserSchema;
//var schema = membersShow;
var schema = teamsSchema;

//var DB2connect = 'mongodb://localhost:27017/utenti';
var DB2connect = 'mongodb://localhost:27017/dati';
	
var db = mongoose.createConnection(DB2connect);	
	
//var modello = db.model('users', schema);
//var modello = db.model('members', schema);
var modello = db.model('teams', schema);

modello.find({name:'Walter'},function(err,user){
				if(err) { console.log('errore!'); return;}
				if(!user){
					console.log('no data!');
				}else{
					console.log(user);
				}
			});
			
var extractKeys = function(keystring) {
	var keyArray = [];
	
	do{
		var indexPoint = keystring.indexOf('.');
		if(indexPoint >= 0 )
		{
			var key = keystring.substr(0, indexPoint);
			if(key.length > 0)
				keyArray.push(key);
			keystring = keystring.substr(indexPoint + 1);
		}else{
			if(keystring.length > 0)
				keyArray.push(keystring);
		}
	}while(indexPoint != -1);
	
	return keyArray;
}

console.log(extractKeys('.'));
