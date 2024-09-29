const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const collectionName = 'denuncias';

const _schema = new Schema({
	ticket: Number,
	idGuild: String,		
	anonimo:Boolean,
	usrDenunciador: {
		id: String,
		bot: Boolean,
		system: Boolean,
		flags: Object, 
		username: String,
		globalName: String,
		discriminator: String,
		avatar: String,
		banner: String,
		accentColor: String,
		avatarDecoration: mongoose.Schema.Types.Mixed
	  },
	usrDenunciado: {
		id: String,
		bot: Boolean,
		system: Boolean,
		flags: Object, 
		username: String,
		globalName: String,
		discriminator: String,
		avatar: String,
		banner: String,
		accentColor: String,
		avatarDecoration: mongoose.Schema.Types.Mixed
	  },
	motivo: String,
	status: { type: Object, default: {id:1,nome:"Criado"} },
	atendente: { type: Object, default: {} },
	criado: { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
}, { collection: collectionName })

_schema.plugin(AutoIncrement, { inc_field: 'ticket' });
const model = mongoose.model(collectionName, _schema);

module.exports = model;
