if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Atualizando  ${commands.length} slash comandos.`);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		for (const d of data) {
			console.log(`/${d.name}: ${d.description.substring(0, 20)}...`);
		}
		console.log(`Atualizados: ${data.length} comandos.`);
	}
	catch (error) {
		console.error(error);
	}
})();
