const axios = require('axios');
const tools = require('../../modules/tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');

const url = 'https://pokeapi.co/api/v2/';

const seg = 30;
const maxPokemons = 150;

const criaCarta = async (texto, img) => {
	const canvas = createCanvas(960, 550);
	const context = canvas.getContext('2d');
	context.strokeRect(0, 0, canvas.width, canvas.height);

	const background = await readFile('D:\\projects\\sarnento2\\public\\img\\bgPoke.png');
	const backgroundImage = new Image();
	backgroundImage.src = background;
	context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

	const { body } = await request(img);
	const avatar = new Image();
	avatar.src = Buffer.from(await body.arrayBuffer());
	context.drawImage(avatar, 10, 0, 570, 570);

	// context.globalAlpha = 0.95;
	context.rect(40, canvas.height - 80, canvas.width, 50);
	context.fillStyle = '#3052ad';
	context.fill();

	context.font = 'bold 42pt Calibri';
	context.fillStyle = '#fccb07';
	context.fillText(texto, 50, canvas.height - 40);

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
