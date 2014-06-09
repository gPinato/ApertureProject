//maaperture auto-generated mongoose schema for collection 'members'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.schema = new mongoose.Schema({
name: { type: String },
surname: { type: String },
email: { type: String },
age: { type: Number, min: 18, max:35 },
interest: { type: [String] }
}, { collection: 'members' });

