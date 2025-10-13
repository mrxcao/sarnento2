const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'react';

const triggerTypesS = require('./triggerTypes')._schema;
const doTypesS = require('./doTypes')._schema;

const _schema = new Schema({
	name: String,
	trigger: triggerTypesS,
	do: doTypesS,
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = model;