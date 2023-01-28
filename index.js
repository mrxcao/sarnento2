if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
const react = require('./modules/react');
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
const token = process.env.TOKEN;
const debug = process.env.DEBUG;
const config = require('./config.json');
const commands = require('./scripts/commandsReader')(config.prefix);

// client.once(Events.ClientReady, c => {
client.on('ready', (c) => {
	moment.locale('pt-br');
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), `Pronto! Logado como: ${c.user.tag} prefixo: ${config.prefix}`);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`comando \\ nçao encontrado: ${interaction.commandName}.`);
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

client.login(token);