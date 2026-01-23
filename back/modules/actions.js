const openAI = require('../services/openAI');
const gemini = require('../services/gemini');
const log = require('./log');

const responder = async (msg, pergunta) => {
	const ai = 2;
	let res;
	switch (ai) {
	case 1:
		res = await openAI.perguntar(msg, pergunta);
		break;
	case 2:
		res = await gemini.perguntar(msg, pergunta);
		break;
	default:
		break;
	}
	if (res) {
		if (res.length > 2000) {
			res =  res.substring(1, 1996) + '...';
		}
		msg.reply(res);
		log.action(msg, ai, pergunta, res);
	}
	return res;
};

module.exports = {
	responder,
};