if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const tools = require('./modules/tools');
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
const config = require('./config.json');
const commands = require('./scripts/commandsReader')(config.prefix, true);
const readSlashCmds = require('./scripts/commandsReaderSlash');
const loaders = require('./classes/Loaders.js');

const usersCtl = require('./DB/mongo/controllers/users');
const guildsCtl = require('./DB/mongo/controllers/guilds');


const token = process.env.TOKEN;
const debug = process.env.DEBUG;

client.on('ready', (c) => {
	tools.clog(`Pronto! Logado como: ${c.user.tag} prefixo: ${config.prefix}`);
	tools.replyLines();
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
		debug ?? console.log(`${interaction.member.guild.name} : ChannelId:${interaction.channelId}  @${interaction.user.username} /${interaction.commandName}`);
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
		debug ? tools.clog('::', msg.guild.name, ' - ', msg.author.username) : true;
		// update infos
		usersCtl.upSert(msg.author);
		guildsCtl.upSert(msg.guild);

		if (args[0].substring(0, 1) == config.prefix) {
			debug ? tools.clog(`${msg.guild.name }  #${msg.channel.name} - @${msg.author.username}: ${msg.content} `) : true;
			const cmd = String(args[0]).toLowerCase();
			if (commands[cmd]) {
				commands[cmd](client, msg);
				// log(cmd, msg);
			}
			else {
				debug ? tools.clog(`comando ${cmd }  não encontrado `) : true;
			}
		}
		else {
			react.say(args, msg);
		}
	}
});

client.on('messageReactionAdd', (rct) => {
	console.log('react', rct);
});

client.on('messageUpdate', (msgOld, msgNew) => {
	console.log('Edito de:', msgOld.content, ' para:', msgNew.content);
	//	console.log('msgOld', msgOld.embeds);

});


tools.replyLines();
loaders.init().then(() => {client.login(token); }) ;


// const teste = require('./apis/currencylayer/axios');

