const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	id: String,
	bot: Boolean,
	system: Boolean,
	flags: String,
	username: String,
	discriminator: Number,
	avatar: String,
	banner: String,
	acc:String,

	login:String,
	password:String,

	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('users', _schema);

module.exports = model;