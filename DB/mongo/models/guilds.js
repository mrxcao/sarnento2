const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	id: Number,
	name: String,
	icon:String,
	available:Boolean,
	memberCount: Number,
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('guilds', _schema);

module.exports = model;

