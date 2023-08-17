const { SlashCommandBuilder } = require('discord.js');
const megasena = require('../modules/megasena');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('megasena')
		.setDescription('Resultado da megasena')
		.addSubcommand(subcommand =>
			subcommand
				.setName('ultimo')
				.setDescription('ultimo resultado'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('todos')
				.setDescription('Coloque os numeros que voce joga para ver se já teria ganhado alguma vez')),
	async execute(interaction) {
		// console.log('interaction', interaction);
		if (interaction.options.getSubcommand() === 'ultimo') {

			const embed = await megasena.last();
			await interaction.reply({ embeds: [embed]	});
			/*
			const user = interaction.options.getUser('target');
			if (user) {
				await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			}
			else {
				await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
			*/
		}
		else if (interaction.options.getSubcommand() === 'todos') {
			await interaction.reply('Ainda não fiz');
		}
	},
};