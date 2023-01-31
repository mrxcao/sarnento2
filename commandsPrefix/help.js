// const commands = require('../scripts/commandsReader')('!');
const CommandsCtl = require('../DB/mongo/controllers/commands.js');

module.exports = async (client, msg) => {
	// const comd = String(Object.keys(commands)).split(',');
	const comd = await CommandsCtl.index();

	let text = 'Lista de comandos: ```  ';
	/*
    for (const c of comd) {
		text = +c + '\n';
	}
*/
	text = +'  ```  ' + comd;
	msg.reply(text);
};
