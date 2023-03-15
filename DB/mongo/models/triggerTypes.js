const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;
const collectionName = 'triggerTypes';

const _schema = new Schema({
	id: Number,
	nome: String,
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = model;