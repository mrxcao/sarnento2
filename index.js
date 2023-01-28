if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const moment = require('moment');
const react = require('./modules/react');
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
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
const token = process.env.TOKEN;
const debug = process.env.DEBUG;
const config = require('./config.json');
const commands = require('./scripts/commandsReader')(config.prefix);
const readSlashCmds = require('./scripts/commandsReaderSlash');
const mongo = require('./modules/DB/mongo');

// client.once(Events.ClientReady, c => {
client.on('ready', (c) => {
	moment.locale('pt-br');
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), `Pronto! Logado como: ${c.user.tag} prefixo: ${config.prefix}`);
	console.log(`${'-'.repeat(lines)}`);
});

// collections de comandos slash
client.commands = readSlashCmds();

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`comando \\ não encontrado: ${interaction.commandName}.`);
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
	if (!msg.author.bot && msg.content) {
		const args = msg.content.split(' ');
		debug ? console.log('args', args) : true;
		if (args[0].substring(0, 1) == config.prefix) {
			debug ? console.log(new Date(), `${msg.guild.name }  #${msg.channel.name} - @${msg.author.username}: ${msg.content} `) : true;
			const cmd = String(args[0]).toLowerCase();
			if (commands[cmd]) {
				commands[cmd](client, msg);
				// log(cmd, msg);
			}
		}
		else {
			react.say(args, msg);
		}
	}
});

client.on('messageReactionAdd', (rct) => {
	console.log('react', rct.Reactions);
});

client.on('messageUpdate', (msg) => {
	console.log('editou: ', msg.content);
});

const lines = 35;
console.log(`${'-'.repeat(lines)}`);
mongo.connect().then(() => {
	client.login(token);
});

console.log(`${'-'.repeat(lines)}`);

