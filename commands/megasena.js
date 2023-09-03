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
				.setDescription('Coloque os numeros que voce joga para ver se já teria ganhado alguma vez')
				.addIntegerOption(option =>
					option
						.setName('d1')
						.setDescription('de 1 a 60')
						.setRequired(true),

				)
				.addIntegerOption(option =>
					option
						.setName('d2')
						.setDescription('de 1 a 60')
						.setRequired(true),

				)
				.addIntegerOption(option =>
					option
						.setName('d3')
						.setDescription('de 1 a 60')
						.setRequired(true),

				)
				.addIntegerOption(option =>
					option
						.setName('d4')
						.setDescription('de 1 a 60')
						.setRequired(true),

				)
				.addIntegerOption(option =>
					option
						.setName('d5')
						.setDescription('de 1 a 60')
						.setRequired(true),

				)
				.addIntegerOption(option =>
					option
						.setName('d6')
						.setDescription('de 1 a 60')
						.setRequired(true),

				),

		),

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

			const d1 = parseInt(interaction.options.getInteger('d1'));
			const d2 = parseInt(interaction.options.getInteger('d2'));
			const d3 = parseInt(interaction.options.getInteger('d3'));
			const d4 = parseInt(interaction.options.getInteger('d4'));
			const d5 = parseInt(interaction.options.getInteger('d5'));
			const d6 = parseInt(interaction.options.getInteger('d6'));
			console.log('d1', d1, d2, d3, d4, d5, d6);

			if (d1 < 0 || d1 > 60 ||
				d2 < 0 || d2 > 60 ||
				d3 < 0 || d3 > 60 ||
				d4 < 0 || d4 > 60 ||
				d5 < 0 || d5 > 60 ||
				d6 < 0 || d6 > 60) {
				await interaction.reply('Aí não, tem que ser entre 1 e 60');
			}
			else {
				// interaction.channel.send('esse demora um pouquinho, mas assim que sair eu já te respondo ....');
				const embed = await megasena.todos(d1, d2, d3, d4, d5, d6);
				await interaction.reply({ embeds: [embed]	});
			}
		}
		else {
			await interaction.reply('Ainda não fiz');
		}
	},
};