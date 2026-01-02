if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const tools = require('./modules/tools.js');
const telegram = require('./services/telegram.js');
const react = require('./modules/react.js');
const actions = require('./modules/actions.js');
const moment = require('moment');
const status = require('./modules/status');

const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
	],
	partials:[
		Partials.Message,
		Partials.Reaction,
	],
});

const config = require('./config.json');
const log = require('./modules/log.js');
const commands = require('./scripts/commandsReader.js')(config.prefix, true);
const readSlashCmds = require('./scripts/commandsReaderSlash.js');
const loaders = require('./classes/Loaders.js');

const usersCtl = require('./DB/mongo/controllers/users.js');
const guildsCtl = require('./DB/mongo/controllers/guilds.js');
const usersGuildsCtrl = require('./DB/mongo/controllers/usersGuilds.js');

const pack = require('./package.json');

const token = process.env.TOKEN;
const debugMode = process.env.DEBUG === 'true' ? true : false;
const clientID = process.env.CLIENTID;

client.on('ready', (c) => {
	const text = `Pronto! BOT ${pack.name} ver:${pack.version}  ${process.env.NODE_ENV}  Logado como: ${c.user.tag} prefixo: ${config.prefix}`;
	console.log(text);
	telegram.send(text);
	tools.replyLines();
	sendStatus();
});
if (debugMode) {
	console.log('Debug mode ON'); console.log('\x07'); // beep
}

const sendStatus = async () => {
	telegram.send(await status.get(0));
};

// cPPPollections de comandos slash //
client.commands = readSlashCmds();

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (debugMode) console.log(`:: /${interaction.commandName} #${interaction.channelId} @${interaction.user.username} `);
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
	if (msg.content) {
		log.messages(msg);
		usersCtl.upSert(msg.author);
		guildsCtl.upSert(msg.guild);
		usersGuildsCtrl.upSert(msg.author.id, msg.guild.id);
	}

	let passOk = true;
	// Gamepad
	if (msg.guild.id === '285570673747820545') {
		// #arquibancada
		if (!msg.channelId === '285570673747820545') {
			passOk = false;
		}
	}
	// Blood  1165449166323982388
	else if (msg.guild.id === '1165449166323982388') {
		// #geral  1165454740528836780		
		if (msg.channelId === '1165454740528836780') {
			passOk = false;
		}
	}
	// rodrryh
	else if (msg.guild.id === '1229534763233316957') {
		if (msg.channelId != '1258101388819435642') {			
			passOk = false;
		}
	}

	if (!msg.author.bot && msg.content) {
		const args = msg.content.split(' ');
		if (debugMode) console.log('::', msg.guild.name, ' - ', msg.author.username);
		// update infos

		if (passOk) {
			if (args[0].substring(0, 1) == config.prefix) {
				debugMode ? console.log(`${msg.guild.name }  #${msg.channel.name} - @${msg.author.username}: ${msg.content} `) : true;
				const cmd = String(args[0]).toLowerCase();
				if (commands[cmd]) {
					commands[cmd](client, msg);
				// log(cmd, msg);
				}
				else {
					debugMode ? console.log(`comando ${cmd }  não encontrado `) : true;
				}
			}
			else {
				const reagiu = await react.verify(args, msg);
				if (!reagiu) {
					const mencionado = msg.mentions.users.has(clientID);
					if (mencionado) {
						// AI blacklist
						const usrBlackList = [
							'1137562742463668324',
							'840264938214653961',
							'1204883523773800550',
							'1122937600093732955',
							'955992896006402078',
							'1084572695703863376',
						];
						const guildBlackList = [
							'1132756472007229500',
						];
						const usrId = msg.author.id;
						const guildId = msg.guild.id;
						if (usrBlackList.indexOf(usrId) > -1 ||
							guildBlackList.indexOf(guildId) > -1) {
							console.log(' -- BLACKLIST', usrId);
							msg.reply('Eu não quero mais falar com você');
						}
						else {
							const pergunta = msg.content.replace(`<@${clientID}>`, '');
							actions.responder(msg, pergunta);
						}

					}
				}

			}
		}
	}
});

client.on('messageReactionAdd', (rct) => {
	debugMode ? console.log('react', rct) : true;
});

client.on('messageUpdate', (msgOld, msgNew) => {
	debugMode ? console.log('Editou de:', msgOld.content, ' para:', msgNew.content) : true;
	//	console.log('msgOld', msgOld.embeds);

});


client.on('voiceStateUpdate', (oldState, newState) => {
	const isBlocked = true
	if (!isBlocked) {
	const member = newState.member;
	const regexEmojis = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji}/gu;
	const guild = newState.guild;
	//console.log("guild.channels", guild.channels.cache);

    let textChannel = null;
	let voiceChannelName = "";
    if (newState.channel) {
        textChannel = newState.channel;
		voiceChannelName = newState.channel.name.replace(regexEmojis, '').toLowerCase();
    } else if (oldState.channel) {
        textChannel = oldState.channel;
		voiceChannelName = oldState.channel.name.replace(regexEmojis, '').toLowerCase();
    }

    if (!textChannel) {
        textChannel = guild.channels.cache.find(channel => 
			(channel.type === 0 && channel.name.toLowerCase() === voiceChannelName) ||
            ['geral', '1133132230600953896', '1128505639849693275', '1165466900558524416', '1109537601217626215']
                .includes(channel.name) || ['1133132230600953896', '1128505639849693275', '1165466900558524416', '1109537601217626215']
                .includes(channel.id)
        );
    }

	const guildsPTBRcomEN = ['1165449166323982388', '1095355564780949526'];
	const guildID_ = guild.id;
	let gmt = 0;
	if (guildsPTBRcomEN.indexOf(guildID_) > -1) {
		gmt = -3 * 60;
	}
	else {
		switch (guild.preferredLocale) {
		case 'pt-BR':
			gmt = -3 * 60;
			break;
		default:
			gmt = 0;
			break;
		}
	}

	const hora = moment().utcOffset(gmt).format('HH:mm');
	if (oldState.channel === null && newState.channel !== null) {
		const channelName = newState.channel.name.replace(regexEmojis, '');
		const channelLink = `discord://discordapp.com/channels/${guild.id}/${newState.channel.id}`;
		if (textChannel) {
			try {
				textChannel.send(`${hora} :: ${member.displayName} entrou no canal de voz  [${channelName}](${channelLink}) `);
			}
			catch (error) {
				console.log('error index announcementChannel', textChannel);
			}

		}
	}
	else if (newState.channel === null && oldState.channel !== null) {
		const channelName = oldState.channel.name.replace(regexEmojis, '');
		const channelLink = `discord://discordapp.com/channels/${guild.id}/${oldState.channel.id}`;
		if (textChannel) {
			textChannel.send(`${hora} :: ${member.displayName} saiu do canal de voz  [${channelName}](${channelLink}) `);
		}
	}

	if (!oldState.streaming && newState.streaming) {
		if (textChannel) {
			let streamName = "algo maneiro";

			// Verifica se iniciou transmissão (Go Live)
			const streamingActivity = newState.member.presence?.activities.find(activity => activity.type === 1);
			if (streamingActivity?.name) streamName = streamingActivity.name;

/*
			const presence = newState.guild.presences.resolve(newState.member.id);
			console.log(1,presence);
			console.log(2,presence?.activities);
			*/
			/*
const voiceState = newState.guild.voiceStates.resolve(newState.member.id);
console.log(voiceState);
*/

			/*
			// Verifica se está ouvindo Spotify
			const spotifyActivity = newState.member.presence?.activities.find(activity => activity.type === 2 && activity.name === "Spotify");
			
			if (spotifyActivity) {
				textChannel.send(`${hora} :: ${member.displayName} está ouvindo **${spotifyActivity.details}** no Spotify 🎵`);
			}
				*/

			textChannel.send(`${hora} :: ${member.displayName} começou a transmitir **${streamName}** 📺 `);
		}
	}
	}
});

tools.replyLines();
loaders.init(1).then(() => {client.login(token); }) ;


// const teste = require('./apis/currencylayer/axios');

