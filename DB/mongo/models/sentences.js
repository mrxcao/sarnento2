const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const collectionName = 'sentences';

const sentenceTypes = require('./sentenceTypes')._schema;

const _schema = new Schema({
	id: Number,
	description: String,
	sentenceType: sentenceTypes,
}, { collection: collectionName });

_schema.plugin(AutoIncrement, { inc_field: 'id' });

const model = mongoose.model(collectionName, _schema);

module.exports = model;