if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const { REST, Routes } = require('discord.js');

const mongo = require('./DB/mongo/connect');
const guildsCtl = require('./DB/mongo/controllers/guilds');

const fs = require('node:fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;

const commands = [];
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		await mongo.connect();
		const guilds = await guildsCtl.index();
		console.log(`Atualizando  ${commands.length} slash comandos em ${guilds.length} servidores ...`);

		// guilds
		for (const g of guilds) {
			console.log('  ', g.name);
			await rest.put(
				Routes.applicationGuildCommands(clientId, g.id),
				{ body: commands },
			);
		}

		// global
		console.log('Atualizando  Global  ...');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log('Atualizados com sucesso');

	}

	catch (error) {
		console.error(error);
	}
})();
