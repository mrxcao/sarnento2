const openAI = require('./apis/openAI');

const responder = async (msg, pergunta) => {
	const res = await openAI.perguntar(msg, pergunta);
	msg.reply(res);
	return res;
};

module.exports = {
	responder,
};