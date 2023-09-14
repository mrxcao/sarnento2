const { SlashCommandBuilder } = require('discord.js');
const pokeApi = require('../modules/apis/pokeapi');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('pokescore')
		.setDescription('Mostra o placar do servidor'),
	async execute(interaction) {
		await interaction.reply('perae ...');
		pokeApi.getPokeScore(interaction.guildId, interaction);


	},
};