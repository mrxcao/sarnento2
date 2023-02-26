const axios = require('axios');
const tools = require('../../modules/tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { request } = require('undici');
// const { readFile } = require('fs/promises');

const url = 'https://pokeapi.co/api/v2/';

const seg = 30;
const maxPokemons = 1008;

const criaCarta = async (texto, img) => {

	const canvas = createCanvas(750, 350);
	const context = canvas.getContext('2d');

	const { body } = await request(img);
	const avatar = new Image();
	avatar.src = Buffer.from(await body.arrayBuffer());
	context.drawImage(avatar, 0, 0, 350, 350);

	// const background = await readFile('./wallpaper.jpg');
	const backgroundImage = new Image();
	// backgroundImage.src = background;
	context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	/*
	context.strokeStyle = '#0099ff';
	context.strokeRect(0, 0, canvas.width, canvas.height);
*/
	context.font = '35px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText(texto, 35, 35);
	context.font = tools.applyCanvasText(canvas, 'valendo');
	context.fillStyle = '#ffffff';

	/*
	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
*/

	// console.log('criacarta', img);
	// const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));

	// const body = await readFile(img);
	// console.log('criacarta', body);


	// const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'poke.png', description: 'poke.png' });

	return canvas.toBuffer('image/png');


};

const quiz = async (msg) => {
	const pokeNo = await tools.randomInteger(maxPokemons);
	const pokePtBr = await pokemon.show(pokeNo);
	const header = {
		method: 'get',
		url: url + 'pokemon/' + pokeNo,
	};
	const response = await axios(header);
	const data = response.data;
	const item = {
		pergunta: `Qual o nome deste Pokemon? (${seg} seg.)`,
		resposta: tools.formatName(data.name),
		respostaBr : pokePtBr[0].nome,
		img : data.sprites.front_default,
	};
	item.cartaPergunta = await criaCarta(item.pergunta, item.img);
	item.cartaResposta = await criaCarta(`#${pokeNo} - ${item.respostaBr}`, item.img);
	// console.log(':: POKE - ', pokeNo, item);
	msg.channel.send({
		content:'',
		files: [ item.cartaPergunta,
		//	item.img
		],
	}).then(() => {
		const msg_filter = (m) => m.content.toLowerCase() == item.resposta.toLowerCase() ||
										m.content.toLowerCase() == item.respostaBr.toLowerCase() ;
		msg.channel.awaitMessages({ filter: msg_filter, max: 1, time: seg * 1000, errors:['time'] })
			.then((collected) => {
				msg.channel.send(
					{ content:`${collected.first().author} acertou!`,
						files: [ item.cartaResposta	],
					});
			})
			.catch(collected => {
				collected;
				msg.channel.send(
					{ content:'Fim do tempo! Ninguém acertou.',
						files: [ item.cartaResposta	],
					});
			});
	});
};

module.exports = { quiz };
