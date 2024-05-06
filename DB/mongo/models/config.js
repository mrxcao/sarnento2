const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	name: String,
	prefix: String,
	sinopseForAI:String,
	blackList_AI: { String },
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('config', _schema);

module.exports = model;