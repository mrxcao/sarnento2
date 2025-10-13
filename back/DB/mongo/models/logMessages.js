const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	idUSr: String,
	idGuild: String,
	idChannel: String,
	msg: String,
	msgForAI: String,
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('logMessages', _schema);

module.exports = model;