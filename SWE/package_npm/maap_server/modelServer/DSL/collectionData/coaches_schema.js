//maaperture auto-generated mongoose schema for collection 'coaches'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.schemaName = 'coaches';

exports.schema = new mongoose.Schema({
name: { type: String },
surname: { type: String },
email: { type: String },
age: { type: Number, min: 18, max:70 }
}, { collection: 'coaches' });

