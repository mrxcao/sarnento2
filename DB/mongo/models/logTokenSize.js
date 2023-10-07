const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = new Schema({
	data:  { type: Date, default: Date.now },
	ai: String,
	size: Number,
});

const model = mongoose.model('logTokenSize', _schema);

module.exports = model;