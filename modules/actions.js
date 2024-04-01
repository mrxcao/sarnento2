const openAI = require('./apis/openAI');
const google = require('./apis/google');
const log = require('./log');

const responder = async (msg, pergunta) => {
	const ai = 1;
	let res;
	switch (ai) {
	case 1:
		res = await openAI.perguntar(msg, pergunta);
		break;
	case 2:
		res = await google.getAnswer(msg, pergunta);
		break;
	default:
		break;
	}
	if (res) {
		msg.reply(res);
		log.action(msg, ai, pergunta, res);
	}
	return res;
};

module.exports = {
	responder,
};