const { SlashCommandBuilder } = require('discord.js');
const pokeApi = require('../src/apis/pokeapi');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Qual é esse Pokemon?'),
	async execute(interaction) {
		// await interaction.reply(`Sua casa é  ${interaction.options.getString('casaodiada')}`);
		pokeApi.quiz(interaction);
	},
};