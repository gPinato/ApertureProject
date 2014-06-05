//maaperture auto-generated mongoose schema:

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
exports.teamsSchema = new mongoose.Schema({
		name: {type: String},
		number_players: {type: Number},
		coach_id: { type: ObjectId }
});