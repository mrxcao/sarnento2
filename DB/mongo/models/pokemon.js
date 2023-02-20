const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	id: String,
	nome: String,
});

const model = mongoose.model('pokemon', _schema);

module.exports = model;