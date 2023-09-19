if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const tools = require('./modules/tools');
const react = require('./modules/react');
const actions = require('./modules/actions');
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

const pack = require('./package.json');

const token = process.env.TOKEN;
const debugMode = process.env.DEBUG === 'true' ? true : false;
const clientID = process.env.CLIENTID;

client.on('ready', (c) => {
	tools.clog(`Pronto! ${pack.name} ver:${pack.version}  ${process.env.NODE_ENV}  Logado como: ${c.user.tag} prefixo: ${config.prefix}`);
	tools.replyLines();
});

// collections de comandos slash //
client.commands = readSlashCmds();

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`comando \\ não encontrado: ${interaction.commandName}.`);
		return;
	}
	try {
		debugMode ?? console.log(`${interaction.member.guild.name} : ChannelId:${interaction.channelId}  @${interaction.user.username} /${interaction.commandName}`);
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
		debugMode ? tools.clog('::', msg.guild.name, ' - ', msg.author.username) : true;
		// update infos
		usersCtl.upSert(msg.author);
		guildsCtl.upSert(msg.guild);

		if (args[0].substring(0, 1) == config.prefix) {
			debugMode ? tools.clog(`${msg.guild.name }  #${msg.channel.name} - @${msg.author.username}: ${msg.content} `) : true;
			const cmd = String(args[0]).toLowerCase();
			if (commands[cmd]) {
				commands[cmd](client, msg);
				// log(cmd, msg);
			}
			else {
				debugMode ? tools.clog(`comando ${cmd }  não encontrado `) : true;
			}
		}
		else {
			const reagiu = await react.verify(args, msg);
			if (!reagiu) {
				const mencionado = msg.mentions.users.has(clientID);
				if (mencionado) {
					const pergunta = msg.content.replace(`<@${clientID}>`, '');
					actions.responder(msg, pergunta);
				}
			}

		}
	}
});

client.on('messageReactionAdd', (rct) => {
	console.log('react', rct);
});

client.on('messageUpdate', (msgOld, msgNew) => {
	console.log('Editou de:', msgOld.content, ' para:', msgNew.content);
	//	console.log('msgOld', msgOld.embeds);

});


tools.replyLines();
loaders.init().then(() => {client.login(token); }) ;


// const teste = require('./apis/currencylayer/axios');

