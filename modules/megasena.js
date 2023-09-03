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
const todos = async (d1, d2, d3, d4, d5, d6) => {
	const sorteios = await megasenaClt.getTodos(d1, d2, d3, d4, d5, d6);
	console.log('sorteios', sorteios[0].premiacoes);

	let description = '';
	const footer = '\o/';

	for (const sorteio of sorteios) {
		let acertos = 0;
		if (sorteio.dezenas.includes(d1)) {acertos++;}
		if (sorteio.dezenas.includes(d2)) {acertos++;}
		if (sorteio.dezenas.includes(d3)) {acertos++;}
		if (sorteio.dezenas.includes(d4)) {acertos++;}
		if (sorteio.dezenas.includes(d5)) {acertos++;}
		if (sorteio.dezenas.includes(d6)) {acertos++;}

		if (acertos > 3) {
			console.log('sorteio', acertos, sorteio);
			const el = sorteio.premiacoes.find(item => item.acertos === acertos);
			console.log('elemento', el);
			let premio;
			let vencedores;
			if (el) {
				premio = el.premio;
				vencedores = el.vencedores;
			}
			else {
				premio = '?';
				vencedores = '?';
			}

			if (premio === 0 && acertos === 6) {
				premio = sorteio.acumuladaProxConcurso;
			}
			else if (premio === 0) {
				premio = ' <não sei> ';
			}

			description = description + `Em **${ moment(sorteio.data).format('DD/MM/YYYY') }**  você acertaría **${acertos}** números e ganharia **R$${premio}** com mais ${vencedores} pessoas\n\n`;
		}

	}

	if (description === '') {
		description = 'Nunca ganharia prêmio nenhum se jogasse estes números em todas as MEGA-SENAs que existíram até hoje';
	}

	console.log('description', description);

	const embed = new EmbedBuilder()
		.setColor(tools.rgbToInt(10, 255, 10))
		.setThumbnail('https://logodownload.org/wp-content/uploads/2018/10/mega-sena-logo.png')
		.setTitle(`Numeros jogados: ${d1} ${d2} ${d3} ${d4} ${d5}`)
		.setDescription(description)

		.setFooter({ text: footer, iconURL: 'http://lofrev.net/wp-content/photos/2017/04/dollar_green_sign.jpg' });
	return embed;
};

module.exports = { last, todos };