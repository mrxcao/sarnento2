const axios = require('axios');
const tools = require('../../modules/tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const url = 'https://pokeapi.co/api/v2/';

const seg = 5;
const maxPokemons = 906;

const quiz = async (msg) => {
	const pokeNo = tools.randomInteger(maxPokemons);

	console.log('pokeNo', pokeNo);

	const header = {
		method: 'get',
		url: url + 'pokemon/' + pokeNo,
	};

	axios(header)
		.then((response) => {
			// const pokeBr = pokemon.show(pokeNo);

			const resolvedPromisesArray = [pokemon.show(pokeNo)];
			const p = Promise.all(resolvedPromisesArray);

			console.log('response', response.data.name, p);

			const data = response.data;
			const item = {
				pergunta: `Queeeem é este POKEMOOONNnnnn? *(O chat terá ${seg} segundos para responder)* `,
				resposta: `${tools.formatName(data.name)}`,
			};
			const filt = r => {
				return item.resposta.some(answer => answer.toLowerCase() === r.content.toLowerCase());
			};


			msg.channel.send(item.pergunta).then(() => {
				msg.channel.send(data.sprites.front_default);
				msg.channel.awaitMessages(filt, { max:1, time: seg * 1000, errors:['time'] })
					.then(collected => {
						console.log('1', 1);
						msg.channel.send(`${collected.first().author} acertou! É o **${item.resposta}!**`);
					})
					.catch(collected => {
						console.log('1', 2);
						collected;
						msg.channel.send(`Fim do tempo! Ninguém acertou. Era o **${item.resposta}!**`);
					});
			});

		})
		.catch((er) => {
			tools.clog(er);
		});
};

module.exports = { quiz };
