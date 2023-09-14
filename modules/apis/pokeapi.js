const axios = require('axios');
const tools = require('../tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const pokeScore = require('../../DB/mongo/controllers/pokeScore');
const users = require('../../DB/mongo/controllers/users');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');
const { EmbedBuilder } = require('discord.js');

const url = process.env.POKEAPI_URL;

const seg = 30;
// 1015;


const criaCarta = async (texto, img) => {
	const canvas = createCanvas(960, 550);
	const context = canvas.getContext('2d');
	context.strokeRect(0, 0, canvas.width, canvas.height);

	// const background = await readFile('D:\\projects\\sarnento2\\public\\img\\bgPoke.png');

	try {
		let background;
		// windows
		if (process.env.NODE_ENV == 'development') {
			background = await readFile(__dirname + '\\..\\..\\public\\img\\bgPoke.png');
		}
		// linux
		else {
			background = await readFile(__dirname + '/../../public/img/bgPoke.png');
		}

		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	}
	catch (error) {
		console.log('criaCarta error', error);
	}

	const { body } = await request(img);
	const avatar = new Image();
	avatar.src = Buffer.from(await body.arrayBuffer());
	context.drawImage(avatar, 20, 0, 570, 570);

	// context.globalAlpha = 0.95;
	context.rect(40, canvas.height - 82, canvas.width, 50);
	context.fillStyle = '#3052ad';
	context.fill();

	if (process.env.NODE_ENV == 'development') {
		context.font = 'bold 42pt Calibri';
	}
	else {
		context.font = 'bold 38pt Calibri';
	}
	// context.font = 'bold 42pt';
	context.fillStyle = '#fccb07';
	context.fillText(texto, 50, canvas.height - 42);

	return canvas.toBuffer('image/png');
};

const getPokeScore = async (guildId, msg) => {
	let description = '';
	let pos = 1;
	const score = await pokeScore.getScore(guildId);
	for (const p of score) {
		const user = await users.get(p.userId);
		//		if (user) {
		description = description + await tools.tabular(pos + 'º', 5) + await tools.tabular(user?.username, 25) + await tools.tabular(p.score, 4, 2) + '\r' ;
		pos++;
		//		}
	}

	const embed = new EmbedBuilder()
		.setColor(tools.rgbToInt(10, 10, 255))
		.setTitle('Placar do servidor:')
		.setDescription('`' + description + '`');


	msg.channel.send({ embeds: [embed]	});
};

const pontuar = async (userId, guildId, msg, pontos = 1) => {
	await pokeScore.addPoint(userId, guildId, pontos);
	getPokeScore(guildId, msg);
};

const quiz = async (msg, qtde = null) => {
	let maxPokemons;
	let pontos;
	if (!qtde) {
		maxPokemons = 1080;
	}
	else if (qtde <= 150) {
		maxPokemons = 150;
	}
	else {
		maxPokemons = qtde;
	}
	if (maxPokemons <= 150) {
		pontos = 1;
	}
	else if (maxPokemons > 150 && maxPokemons <= 550) {
		pontos = 2;
	}
	else {
		pontos = 3;
	}

	const pokeNo = await tools.randomInteger(maxPokemons);
	const pokePtBr = await pokemon.show(pokeNo);
	const header = {
		method: 'get',
		url: url + 'pokemon/' + pokeNo,
	};
	const response = await axios(header);
	const data = response.data;
	const item = {
		pergunta: 'Qual o nome deste Pokemon? ',
		resposta: tools.formatName(data.name),
		respostaBr : pokePtBr[0].nome,
		img : data.sprites.front_default,
	};
	item.cartaPergunta = await criaCarta(item.pergunta, item.img);
	item.cartaResposta = await criaCarta(`#${pokeNo} - ${item.respostaBr}`, item.img);
	// console.log(':: POKE - ', pokeNo, item);
	msg.channel.send({
		content:`Começou: ${seg} seg. para responder`,
		files: [ item.cartaPergunta,
		//	item.img
		],
	}).then(() => {
		const msg_filter = (m) => m.content.toLowerCase() == item.resposta.toLowerCase() ||
										m.content.toLowerCase() == item.respostaBr.toLowerCase() ;
		msg.channel.awaitMessages({ filter: msg_filter, max: 1, time: seg * 1000, errors:['time'] })
			.then((collected) => {
				// console.log('collected', collected.first().author.id, collected.first().guildId);
				pontuar(collected.first().author.id, collected.first().guildId, msg, pontos);

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

module.exports = { quiz, getPokeScore };
