const fs = require('fs');
const dir = '../commands';
const { Collection } = require('discord.js');
const path = require('node:path');
const CommandsCtl = require('../DB/mongo/controllers/commands.js');

module.exports = () => {
	const cmds = new Collection();
	const commandsPath = path.join(__dirname, dir);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			cmds.set(command.data.name, command);
			const data = {
				nome: command.data.name,
				slash: true,
				atualizado: new Date(),
			};
			// if (verifyDB) {
			CommandsCtl.upSert(data);
			// }

		}
		else {
			console.log(`[WARNING] O comando ${filePath} não tem "data" ou "execute".`);
		}
	}
	return cmds;
};