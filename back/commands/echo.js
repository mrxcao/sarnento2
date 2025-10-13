const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tools = require('../modules/tools');
module.exports = {
	data : new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true))
	// setMaxLength() setMinLength(), setMaxValue()  setMinValue()
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to echo into'))
	// addChannelTypes()  e.g. ChannelType.GuildText.
		.addBooleanOption(option =>
			option.setName('ephemeral')
				.setDescription('Whether or not the echo should be ephemeral')),
	async execute(interaction) {

		const embed = new EmbedBuilder()
			.setColor(tools.rgbToInt(0, 255, 0))
			.setTitle('eco eco eco ...')
			.setURL('https://discord.js.org/')
			.setAuthor({ name: 'Sarnento',
				iconURL: 'https://cdn.discordapp.com/avatars/722913076344782858/bb7ff6efc098f79645946ce546a7ac33.webp?size=2048',
				url: 'https://discord.com/oauth2/authorize?client_id=722913076344782858&scope=bot&permissions=549755289087' })
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Valor', value: '1', inline: true },
				{ name: 'valor2', value: '2', inline: true },
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'espero que goste',
				iconURL: 'https://cdn.discordapp.com/avatars/722913076344782858/bb7ff6efc098f79645946ce546a7ac33.webp?size=2048' });

		interaction.reply({ embeds: [embed] });
	},
};