const config = require('../config.json');
const commands = require('../scripts/commandsReader')(config.prefix);

module.exports = (client, msg) => {
	const comd = String(Object.keys(commands)).split(',');
	msg.reply('Lista de comandos:  ``` ' + comd + ' ``` ');
};