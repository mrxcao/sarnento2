const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'react';

const triggerTypesS = require('./triggerTypes');
const doTypesS = require('./doTypes');

const _schema = new Schema({
	id: Number,
	nome: String,
	triggerType: triggerTypesS,
	doType:  doTypesS,
	doData: Object,
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = model;