const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;
const collectionName = 'token';

const _schema = new Schema({
	name: String,
	dataInicio: { type: Date, default: Date.now },
	dataFim: Date,
	token: String,
	ativo: { type: Boolean, default: true },
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = model;