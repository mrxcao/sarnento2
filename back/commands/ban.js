const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Manda o safado pastar')
		.addUserOption(option =>
			option
				.setName('pessoa')
				.setDescription('Membro que vai ser banido')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('motivo')
				.setDescription('Motivo do banimento'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const oCara = interaction.options.getUser('pessoa');
		console.log('oCara', oCara);
		// console.log('nteraction.options', interaction.options);
		const motivo = interaction.options.getString('motivo') ?? 'Sem justificativa';
		if (oCara.bot) {
			await interaction.reply(`Eu não posso banir um bot cara, ainda mais o <@${oCara.id}>! É contra os meus princípios. Ainda mais por ${motivo}`);
		}
		else if (oCara) {
			await interaction.reply(`Cara, você não pode banir o <@${oCara.id}>! Tá locão? Ainda mais por ${motivo}`);
		}


		// para banir mesmo
		// await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		// await interaction.guild.members.ban(target);


	},

};