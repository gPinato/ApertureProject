//maaperture auto-generated mongoose schema:

var mongoose = require('mongoose');

exports.indexSchema = new mongoose.Schema({
_id: { type: Number, min: 18, max:65 },
data_nascita: { type: Date, default: Date.now },
nome3_db: { type: String }
});

exports.showSchema = new mongoose.Schema({
nome1_db: { type: String },
nome2_db: { type: String },
nome3_db: { type: String },
nome3_db: { type: String }
});

