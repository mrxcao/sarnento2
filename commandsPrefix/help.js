// const commands = require('../scripts/commandsReader')('!');
const CommandsCtl = require('../DB/mongo/controllers/commands.js');

module.exports = async (client, msg) => {
	// const comd = String(Object.keys(commands)).split(',');
	const comd = await CommandsCtl.index({ 'prefix':true });
	let text = 'Lista de comandos de prefixo: ```';
	for (const c of comd) {
		text = text + c.nome + '\n';
	}
	text = text + '```\n';

	const comdSlash = await CommandsCtl.index({ 'slash':true });
	text = text + 'Lista de comandos de Slash: ```';
	for (const c of comdSlash) {
		text = text + c.nome + '\n';
	}
	text = text + '```';

	msg.reply(text);
};
