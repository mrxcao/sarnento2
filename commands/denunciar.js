const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const denunciar = require('../modules/denunciar')
module.exports = {
	data : new SlashCommandBuilder()
		.setName('denunciar')
		.setDescription('Denunciar um usuário do servidor')
		.addUserOption(option =>
			option
				.setName('usuario')
				.setDescription('usuario denunciado')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('motivo')
				.setDescription('Motivo do banimento')
                .setRequired(true))
        .addBooleanOption(option =>
            option
                .setName('anonimo')
                .setDescription('Denunciar anonimamente? ()'))
		.setDMPermission(false),
	async execute(interaction) {
        const usrDenunciador = interaction.user
		const usrDenunciado  = interaction.options.getUser('usuario');
		const motivo = interaction.options.getString('motivo') ?? 'Sem justificativa';
        const anonimo = interaction.options.getBoolean('anonimo') || false;
        const idGuild = interaction.guild.id

        const params = {usrDenunciador,
            usrDenunciado,
            motivo,
            anonimo,
            idGuild, }
        await denunciar.nova(params)

        await interaction.reply(`Denúncia registrada - Esta mensagme se apagará em 5seg.`)
        setTimeout(() => {
			interaction.deleteReply()				
				.catch(console.error);
		}, 5000); 
        /*
		try {
			await interaction.user.send(`Sua denúncia contra ${usuarioDenunciado.tag} foi registrada com sucesso.`);
		} catch (error) {
			console.error(`Não foi possível enviar DM para ${interaction.user.tag}.`, error);
		}
*/


	},

};