const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		await interaction.reply('Pong!!!');
		await wait(3000);
		await interaction.editReply('Pong de novo!');
		await wait(3000);
		await interaction.editReply('Pong mais uma vez!');
		await wait(3000);
		await interaction.editReply('vou ficar pongando, fds');
		await wait(3000);
		await interaction.editReply('Pong!');

		/* // fingir escrevendo
		 await interaction.deferReply();
		//await interaction.deferReply({ ephemeral: true });

		await wait(4000);
		await interaction.editReply('Pong! 3');
*/
		// await interaction.followUp('Pong again! 2');
		/* // msg reply
		const message = await interaction.fetchReply();
		console.log('msg:', message);
*/


	},
};
