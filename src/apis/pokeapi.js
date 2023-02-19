const axios = require('axios');
const tools = require('../../modules/tools');
const url = 'https://pokeapi.co/api/v2/';

const seg = 5;
const maxPokemons = 906;

const quiz = (msg) => {
	const pokeNo = tools.randomInteger(maxPokemons);

	console.log('pokeNo', pokeNo);

	const header = {
		method: 'get',
		url: url + 'pokemon/' + pokeNo,
	};

	axios(header)
		.then((response) => {
			console.log('response', response.data.name);

			const data = response.data;
			const item = {
				pergunta: `Queeeem é este POKEMOOONNnnnn? *(O chat terá ${seg} segundos para responder)* `,
				resposta: `${tools.formatName(data.name)}`,
			};
			const filt = response => {
				return item.resposta.some(answer => answer.toLowerCase() === response.content.toLowerCase());
			};


			msg.channel.send(item.pergunta).then(() => {
				msg.channel.send(data.sprites.front_default);
				msg.channel.awaitMessages(filt, { max:1, time: seg * 1000, errors:['time'] })
					.then(collected => {
						msg.channel.send(`${collected.first().author} acertou! É o **${item.resposta}!**`);
					})
					.catch(collected => {
						msg.channel.send(`Fim do tempo! Ninguém acertou. Era o **${item.resposta}!**`);
					});
			});

		})
		.catch((er) => {
			tools.clog(er);
		});
};

module.exports = { quiz };
