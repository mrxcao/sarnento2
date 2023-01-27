if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
// const react = require("./modules/react");
const token = process.env.TOKEN;
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
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
const config = require('./config.json');

// client.once(Events.ClientReady, c => {
client.on('ready', (c) => {
	moment.locale('pt-br');
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), `Pronto! Logado como: ${c.user.tag} prefixo: ${config.prefix} `);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	//	console.log(`-+- !${command.data.name} :${command.data.description}`);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		console.log(`${interaction.member.guild.name} : ChannelId:${interaction.channelId}  @${interaction.user.username} /${interaction.commandName}`);
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while  executing this command!', ephemeral: true });
	}

});

client.on('messageCreate', async (msg) => {
	console.log('msg.guild', msg.content);
});

client.on('messageReactionAdd', (react) => {
	console.log('react', react);
});

client.login(token);