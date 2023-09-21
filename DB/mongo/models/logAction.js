const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	data:  { type: Date, default: Date.now },
	prompt: String,
	resposta: String,
	ai: String,
	guild: {
		id: String,
		name: String,
	},
	user: {
		id: String,
		username: String,
	},
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('logActions', _schema);

module.exports = model;