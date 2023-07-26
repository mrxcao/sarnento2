const { SlashCommandBuilder } = require('discord.js');
const pokeApi = require('../src/apis/pokeapi');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Qual é esse Pokemon?')
		.addIntegerOption(option =>
			option
				.setName('quantos')
				.setDescription('Até qual? (mínimo 150)')
				.setRequired(false)
				.setDescriptionLocalizations({
					'en-US': 'How far? (minimum 150)',
					'pt-BR': 'Até qual? (mínimo 150)',
				}),
		),
	async execute(interaction) {
		const qtde = parseInt(interaction.options.getInteger('quantos'));

		pokeApi.quiz(interaction, qtde);
		if (qtde <= 150) {
			await interaction.reply('Bora! Facim ... (valendo 1 ponto)');
		}
		else if (qtde > 150 && qtde <= 550) {
			await interaction.reply(`${qtde} Bora! (valendo 2 ponto)`);
		}
		else {
			await interaction.reply(`${qtde}? Eita! (valendo 3 ponto)`);
		}

	},
};