const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const _schema = new Schema({
	id: objectId,
	nome: { type: String, required: true, unique:true, lowercase: true, trim: true },
	prefix: { type: Boolean, default: false },
	slash: { type: Boolean, default: false },
	criado: { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('commands', _schema);

module.exports = model;