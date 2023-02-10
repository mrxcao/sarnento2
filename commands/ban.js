const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Manda o safado pastar.')
		.addUserOption(option =>
			option
				.setName('oCara')
				.setDescription('Membro que vai ser banido')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('motivo')
				.setDescription('motivo do banimento'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const oCara = interaction.options.getUser('oCara');
		const motivo = interaction.options.getString('motivo') ?? 'Sem justificativa';
		await interaction.reply(`Cara, você não pode baniro o <@${oCara.id}>! Tá locão? Ainda mais por ${motivo}`);


		/* para banir mesmo
		await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		// await interaction.guild.members.ban(target);
		*/

	},
};