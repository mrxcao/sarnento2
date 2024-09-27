const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const collectionName = 'denuncias';

const users = require('./users')._schema;

const _schema = new Schema({
	ticket: Number,
	idGuild: String,		
	anonimo:Boolean,
	usrDenunciador:users,
	usrDenunciado:users,
	motivo: String,
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
}, { collection: collectionName })

_schema.plugin(AutoIncrement, { inc_field: 'ticket' });
const model = mongoose.model(collectionName, _schema);

module.exports = model;
