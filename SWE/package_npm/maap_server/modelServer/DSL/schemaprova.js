//maaperture auto-generated mongoose schema:

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
exports.teamsSchema = new mongoose.Schema({
		name: {type: String},
		number_players: {type: Number},
		coach: { type: ObjectId , ref:'coaches' },
		coachDue: { type: ObjectId , ref:'coaches' },
		supermarket: { type: ObjectId , ref:'supermarket' }
});

exports.coachesSchema = new mongoose.Schema({
name: { type: String },
surname: { type: String },
email: { type: String },
age: { type: Number, min: 18, max:70 }
});

exports.supermarketSchema = new mongoose.Schema({
nome: { type: String },
prezzo: { type: Number, min: 0.01, max:350 },
offerta: { type: String },
posizione: { type: ObjectId }
});
