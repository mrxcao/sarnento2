const openAI = require('./apis/openAI');
const log = require('./log');

const responder = async (msg, pergunta) => {
	const res = await openAI.perguntar(msg, pergunta);
	msg.reply(res);
	log.action(msg, 'openAI', pergunta, res);
	return res;
};

module.exports = {
	responder,
};