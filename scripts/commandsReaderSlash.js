const fs = require('fs');
const dir = '../commands';
const { Collection } = require('discord.js');
const path = require('node:path');

module.exports = () => {
	const cmds = new Collection();
	const commandsPath = path.join(__dirname, dir);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			cmds.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] O comando ${filePath} não tem "data" ou "execute".`);
		}
	}
	return cmds;
};