const fs = require('fs');
const dir = './commandsPrefix/';
const CommandsCtl = require('../DB/mongo/controllers/commands.js');

module.exports = (prefix, verifyDB = false) => {
	const commands = {};
	const scripts = fs.readdirSync(dir);
	scripts.forEach(script => {
		commands[prefix + String(script.split('.')[0]).toLowerCase() ] = require('../' + dir + script);
		const data = {
			nome: script.substring(0, script.length - 3),
			atualizado: new Date(),
		};
		if (verifyDB) {
			CommandsCtl.upSert(data);
		}
	});
	return commands;
};