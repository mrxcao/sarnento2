const { SlashCommandBuilder } = require('discord.js');
const pokeApi = require('../src/apis/pokeapi');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('pokescore')
		.setDescription('Mostra o placar do servidor'),
	async execute(interaction) {
		pokeApi.getPokeScore(interaction.guildId, interaction);
		await interaction.say('perae ...');


	},
};