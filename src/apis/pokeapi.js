const axios = require('axios');
const tools = require('../../modules/tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const { AttachmentBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');

const url = 'https://pokeapi.co/api/v2/';

const seg = 30;
const maxPokemons = 1008;

const criaCarta = async (texto, img) => {

	const canvas = createCanvas(700, 250);
	const context = canvas.getContext('2d');

	// const background = await readFile('./wallpaper.jpg');
	const backgroundImage = new Image();
	// backgroundImage.src = background;
	context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

	context.strokeStyle = '#0099ff';
	context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '28px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

	context.font = tools.applyCanvasText(canvas, `${texto}!`);
	context.fillStyle = '#ffffff';
	// context.fillText(`${interaction.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

	// console.log('criacarta', img);
	// const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
	// const body = await request(img);
	// const body = await readFile(img);
	// console.log('criacarta', body);


	const avatar = new Image();
	// avatar.src = Buffer.from(await body.arrayBuffer());


	context.drawImage(avatar, 25, 25, 200, 200);

	// const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'poke.png', description: 'poke.png' });
	console.log('10', 10);
	return canvas.toBuffer('image/png');


};

const quiz = async (msg) => {
	const pokeNo = await tools.randomInteger(maxPokemons);
	const pokePtBr = await pokemon.show(pokeNo);
	const header = {
		method: 'get',
		url: url + 'pokemon/' + pokeNo,
	};


	axios(header)
		.then((response) => {
			// const pokeBr = pokemon.show(pokeNo);
			const data = response.data;
			const item = {
				pergunta: `Quaal o nome deste Pokemon? *(O chat terá ${seg} segundos para responder)* `,
				resposta: tools.formatName(data.name),
				respostaBr : pokePtBr[0].nome,
				img : data.sprites.front_default,
			};
			item.cartaPergunta = criaCarta(item.pergunta, item.img);
			console.log(':: POKE - ', pokeNo, item);

			// const cartaPergunta = data.sprites.front_default;


			/*
			const filt = r => {
				return item.resposta.some(answer => answer.toLowerCase() === r.content.toLowerCase());
			};
			*/
			console.log('11', 11);
			msg.channel.send({ 'description':item.pergunta,
				content:item.pergunta,
				files: [ item.img ],
			}).then(() => {
				// msg.channel.send(data.sprites.front_default);
				const msg_filter = (m) => m.content.toLowerCase() == item.resposta.toLowerCase() ||
										m.content.toLowerCase() == item.respostaBr.toLowerCase() ;
				msg.channel.awaitMessages({ filter: msg_filter, max: 1, time: seg * 1000, errors:['time'] })
					.then((collected) => {
						msg.channel.send(`${collected.first().author} acertou! É o **${item.resposta} (${item.respostaBr})!**`);
					})
					.catch(collected => {
						collected;
						msg.channel.send(`Fim do tempo! Ninguém acertou. Era o **${item.resposta} (${item.respostaBr})!**`);
					});

				/*
				msg.channel.awaitMessages(filt, { max:1, time: seg * 1000, errors:['time'] })
					.then(collected => {
						msg.channel.send(`${collected.first().author} acertou! É o **${item.resposta}!**`);
					})
					.catch(collected => {
						collected;
						msg.channel.send(`Fim do tempo! Ninguém acertou. Era o **${item.resposta}!**`);
					});

					*/
			});

		})
		.catch((er) => {
			tools.clog(er);
		});
};

module.exports = { quiz };
