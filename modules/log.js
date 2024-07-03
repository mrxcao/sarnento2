const logActionClt = require('../DB/mongo/controllers/logAction');
const logUsersClt = require('../DB/mongo/controllers/users');
const logMessagesClt = require('../DB/mongo/controllers/logMessages');
const moment = require('moment');

const action = (msg, ai, prompt, resposta) => {
	const data = {
		prompt,
		resposta,
		ai,
		guild: {
			id: msg.guildId,
			name: msg.guild.name,
		},
		user: {
			id: msg.author.id,
			username: msg.author.username,
		},
	};
	logActionClt.store(data);
};

const messages = async (msg) => {
	let userErro = null;
	try {
		const dataPtBr = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm');

		let msgForAI = `${dataPtBr} @${msg.author.username}: ${msg.content}` ;
		const continuar = true;
		while (msgForAI.indexOf('<@') > -1 && continuar) {
			const idUsr = msgForAI.substring(msgForAI.indexOf('<@') + 2, msgForAI.indexOf('>'));
			const userName = await logUsersClt.getUserName(idUsr);
			userErro = idUsr;
			msgForAI = msgForAI.replace(new RegExp(`<@${idUsr}>`, 'g'), `@${userName}`);
		}

		const data = {
			idUSr: msg.author.id,
			idGuild: msg.guildId,
			idChannel: msg.channelId,
			msg: msg.content,
			msgForAI,
		};
		logMessagesClt.store(data);
	}
	catch (err) {
		throw new Error(err + ' usrError:: ' + userErro);
	}

};

const getMessagesGuild = async (guildId) => {
	const data = await logMessagesClt.getGuildsMsgs(guildId);
	return data;
};


module.exports = { action, messages, getMessagesGuild };