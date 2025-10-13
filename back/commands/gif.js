const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data : new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Sends a random gif!')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'Funny', value: 'gif_funny' },
					{ name: 'Meme', value: 'gif_meme' },
					{ name: 'Movie', value: 'gif_movie' },
				)),
	async execute(interaction) {
		const category = interaction.options.getString('category');
		// category must be one of 'gif_funny', 'gif_meme', or 'gif_movie'
		console.log('interaction', category);
	},
};