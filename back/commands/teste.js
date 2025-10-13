const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teste')
		.setDescription('teste de botão'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('testeTb1')
					.setLabel('teste bt 1')
					.setStyle('SUCCESS'),

				new MessageButton()
					.setCustomId('testeTb2')
					.setLabel('teste bt 2')
					.setStyle('DANGER'),
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Map: Teste doido de botão')
			.setURL('https://discord.js.org')
			.setImage('https://i.imgur.com/s54Riow.jpeg')
			.setDescription('description test');

		await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });

	},
};