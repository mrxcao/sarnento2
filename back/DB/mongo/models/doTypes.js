const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;
const collectionName = 'doTypes';

const _schema = new Schema({
	id: Number,
	name: String,
	expectedData: Object,
	data: Object,
}, { collection: collectionName });

const model = mongoose.model(collectionName, _schema);

module.exports = { model, _schema };