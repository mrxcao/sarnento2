const bard = require('../modules/apis/google');

module.exports = async (client, msg) => {
	const resp = await bard.getAnswer('Qual é o limite do prompt em tokens que o google bard suporta? Pode fazer uma comparação com outras AIs?	faça gráficos e tabelas em markdown');
	msg.reply(resp);
};
