// const openAI = require('./apis/openAI');
const google = require('./apis/google');
const log = require('./log');

const responder = async (msg, pergunta) => {
	// const res = await openAI.perguntar(msg, pergunta);
	const res = await google.getAnswer(msg, pergunta);
	msg.reply(res);
	log.action(msg, 'bard', pergunta, res);
	return res;
};

module.exports = {
	responder,
};