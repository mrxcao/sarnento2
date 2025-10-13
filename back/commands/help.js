const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tools = require('../modules/tools');
module.exports = {
	data : new SlashCommandBuilder()
		.setName('help')
		.setDescription('Precisa de ajuda?'),
	async execute(interaction) {

		const embed = new EmbedBuilder()
			.setColor(tools.rgbToInt(0, 255, 0))
			.setTitle('Sarnento ')
			.setURL('https://www.sarnento.app.br')
			.setDescription('Sarnento é um bot que além dos comandos tradicionais, ainda interage com o seu chat. Para mais informações e lista de comandos, acesse: www.sarnento.app.br')
			.setThumbnail('https://sarnento.app.br/img/sar3.jpeg')

		// .setImage('https://i.imgur.com/AfFp7pu.png')

			.setFooter({ text: 'Qualquer coisa, manda mensagem lá no site que eu respondo rapidinho',
				iconURL: 'https://cdn.discordapp.com/avatars/722913076344782858/bb7ff6efc098f79645946ce546a7ac33.webp?size=2048' });

		interaction.reply({ embeds: [embed] });
	},
};