//maaperture auto-generated mongoose schema:

var mongoose = require('mongoose');

exports.teamsSchema = new mongoose.Schema({
		name: {type: String},
		number_players: {type: Number},
		coach: {name:{type: String}, surname:{type: String}, email:{type: String}, age: {type: Number}}
	});