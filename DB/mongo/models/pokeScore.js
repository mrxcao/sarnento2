const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;
const collectionName = 'pokeScore';

const _schema = new Schema({
	userId: String,
	guildId: String,
	score:Number,
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = model;