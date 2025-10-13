const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	id: String,
	name: String,
	icon:String,
	available:Boolean,
	memberCount: Number,
	preferredLocale: String,
    settings: {
        channelIdNotification: { type: String, default: null },
        channelIdComplaint: { type: String, default: null }
    },
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('guilds', _schema);

module.exports = model;

