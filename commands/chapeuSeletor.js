const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data : new SlashCommandBuilder()
		.setName('chapeuseletor')
		.setNameLocalizations({
			'en-US': 'selectorhat',
			'pt-BR': 'chapeuseletor',
		})
		.setDescription('use o chapeu seletor e saiba qual é a sua casa')
		.setDescriptionLocalizations({
			'en-US': 'discover what is your house',
			'pt-BR': 'use o chapeu seletor e saiba qual é a sua casa',
		})
		.addStringOption(option =>
			option
				.setName('casaodiada')
				.setDescription('CasaOdiada')
				.setRequired(true)
				.setNameLocalizations({
					'en-US': 'whosthouse',
					'pt-BR': 'casaodiada',
				})
				.setDescriptionLocalizations({
					'en-US':'what house you dont like',
					'pt-BR':'casa que você não gosta',
				}),
		),
	async execute(interaction) {
		// console.log('interaction', interaction.options.getString('breed'));
		await interaction.reply(`Sua casa é  ${interaction.options.getString('casaodiada')}`);
	},
};