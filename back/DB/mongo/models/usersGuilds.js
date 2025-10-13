const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = new Schema({
	userId: String,
	guildId: String,
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('usersGuilds', _schema);

module.exports = model;