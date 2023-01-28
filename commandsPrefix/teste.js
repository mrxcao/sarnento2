const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('teste')
		.setDescription('teste'),
	async execute(interaction) {
		await interaction.reply('teste ok!');
	},
};

/*
module.exports = async (client, msg) => {
    msg.reply('teste ok');
} */