const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data : new SlashCommandBuilder()
		.setName('dog')
		.setNameLocalizations({
			pl: 'pies',
			de: 'hund',
			'pt-BR': 'cachorro',
		})
		.setDescription('Get a cute picture of a dog!')
		.setDescriptionLocalizations({
			pl: 'Słodkie zdjęcie pieska!',
			de: 'Poste ein niedliches Hundebild!',
			'pt-BR': 'pega uma foto de um cachorro',
		})
		.addStringOption(option =>
			option
				.setName('breed')
				.setDescription('Breed of dog')
				.setNameLocalizations({
					pl: 'rasa',
					de: 'rasse',
					'pt-BR': 'raça',
				})
				.setDescriptionLocalizations({
					pl: 'Rasa psa',
					de: 'Hunderasse',
					'pt-BR': 'raça do doguinho',
				}),
		),
	async execute(interaction) {
		console.log('interaction', interaction.options.getString('breed'));
		await interaction.reply(`GIF doguinho  ${interaction.options.getString('breed')}`);
	},
};