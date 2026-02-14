const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	name: String,
	prefix: String,
	sinopseForAI:String,
	lastUpTime:Date,
	tempoGuardaDias: Number,
	avisarCalls: [{ 
		guildId: String,
		name: String,
		channelId: String
	 }],
	ai: {
		usrBlackList: [String],
		guildBlackList: [String]
	},
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('settings', _schema);

module.exports = model;