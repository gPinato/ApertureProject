//maaperture auto-generated mongoose schema:

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.schema = new mongoose.Schema({
name: { type: String },
number_players: { type: Number, min: 23, max:35 },
coach: { type: ObjectId }
});

