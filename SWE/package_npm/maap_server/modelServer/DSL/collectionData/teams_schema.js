//maaperture auto-generated mongoose schema for collection 'teams'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.schemaName = 'teams';

exports.schema = new mongoose.Schema({
name: { type: String },
number_players: { type: Number, min: 23, max:35 },
coach: { type: ObjectId, ref: 'coaches' },
coach2: { type: ObjectId, ref: 'coaches' },
market: { type: ObjectId, ref: 'supermarket' }
}, { collection: 'teams' });

