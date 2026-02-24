const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

const _schema = new Schema({
	sinopseForAI:String,
	lastUpTime:Date,
	tempoGuardaDias: Number,
	avisarCalls: [{ 
		guidlId: String,
		name: String,
		channelId: String
	 }],
	ai: {
		usrBlackList: [String],
		guildBlackList: [String]
	},
	notLog: {
		usersId: [String],
		guildsId: [String]
	},
	criado:  { type: Date, default: Date.now },
	atualizado:  { type: Date, default: Date.now },
});

const model = mongoose.model('settings', _schema);

module.exports = model;