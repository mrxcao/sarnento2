const megasenaClt = require('../DB/mongo/controllers/megasena');
const { EmbedBuilder } = require('discord.js');
const tools = require('../modules/tools');
const moment = require('moment');


const last = async () => {
	const mega = (await megasenaClt.last())[0];
	const description = `Concurso: **${mega.concurso}** - ${ moment(mega.data).format('DD/MM/YYYY') } 
    Os números sorteados foram:`;
	let premio = '';
	for (const pre of mega.premiacoes) {
		if (pre.vencedores > 0) {
			premio = premio + `\n${pre.vencedores} acertaram ${pre.acertos} números e ganharam ${pre.premio}`;
		}
		else {
			premio = premio + `\nNinguém acertou ${pre.acertos} números`;
		}
	}
	const acumulado = `acumulado para o próximo concurso: ${mega.acumuladaProxConcurso}`;
	const footer = `${premio} \n\n ${acumulado} `;
	const embed = new EmbedBuilder()
		.setColor(tools.rgbToInt(10, 255, 10))
		.setThumbnail('https://logodownload.org/wp-content/uploads/2018/10/mega-sena-logo.png')
		.setTitle('Ultimo sorteio')
		.setDescription(description)
		.setFields(
			{ name: '\u200B', value: '**' + mega.dezenas[0].toString() + '**', inline: true },
			{ name: '\u200B', value: '**' + mega.dezenas[1].toString() + '**', inline: true },
			{ name: '\u200B', value: '**' + mega.dezenas[2].toString() + '**', inline: true },
			{ name: '\u200B', value: '**' + mega.dezenas[3].toString() + '**', inline: true },
			{ name: '\u200B', value: '**' + mega.dezenas[4].toString() + '**', inline: true },
			{ name: '\u200B', value: '**' + mega.dezenas[5].toString() + '**', inline: true },

		)
		.setFooter({ text: footer, iconURL: 'http://lofrev.net/wp-content/photos/2017/04/dollar_green_sign.jpg' });
	return embed;
};

module.exports = { last };