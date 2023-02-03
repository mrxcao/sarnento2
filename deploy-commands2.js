if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
/*
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES'],
});
*/
const token = process.env.TOKEN;
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions			],
	partials:[
		Partials.Message,
		Partials.Reaction,
	],
});
client.login(token);


const fs = require('fs');

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();


const slashCommandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for (const file of slashCommandFiles) {
	const slashCommand = require(`./commands/${file}`);
	client.slashCommands.set(slashCommand.name, slashCommand);
}


console.log(`Atualizados: ${slashCommandFiles.length} comandos.`);