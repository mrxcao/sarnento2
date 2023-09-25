const logActionClt = require('../DB/mongo/controllers/logAction');
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
const messages = (msg) => {
	const dataPtBr = moment().format('DD/MM/YYYY HH:mm');

	// eslint-disable-next-line prefer-const
	let msgForAI = `${dataPtBr} ${msg.author.username}: ${msg.content}` ;

	console.log('---------------------');
	console.log('msgForAI 1', msgForAI);
	let continuar = true;
	while (msgForAI.indexOf('<@') > -1 && continuar) {
		const idUsr = msgForAI.substring(msgForAI.indexOf('<@') + 2, msgForAI.indexOf('>'));
		console.log('idUsr', idUsr);
		msgForAI.replace(new RegExp(`<@${idUsr}>`, 'g'), '@nome');
		console.log('msgForAI 2', msgForAI);

		continuar = false;
	}
	console.log('msgForAI 3', msgForAI);
	console.log('---------------------');
	/*
	msgForAI 1 25/09/2023 18:40 mrxcao: <@1036717683862945802>  manda salve
	idUsr 1036717683862945802
	msgForAI 2 25/09/2023 18:40 mrxcao: <@1036717683862945802>  manda salve
	msgForAI 3 25/09/2023 18:40 mrxcao: <@1036717683862945802>  manda salve
*/

	const data = {
		idUSr: msg.author.id,
		idGuild: msg.guildId,
		idChannel: msg.channelId,
		msg: msg.content,
		msgForAI,
	};
	logMessagesClt.store(data);
};

const getMessagesGuild = async (guildId) => {
	const data = await logMessagesClt.getGuildsMsgs(guildId);
	return data;
};


module.exports = { action, messages, getMessagesGuild };