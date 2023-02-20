const axios = require('axios');
const tools = require('../../modules/tools');
const pokemon = require('../../DB/mongo/controllers/pokemon');
const url = 'https://pokeapi.co/api/v2/';

const seg = 5;
const maxPokemons = 1008;

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

			console.log(':: POKE - ', pokeNo, response.data.name, pokePtBr[0].name);

			const data = response.data;
			const item = {
				pergunta: `Quaal o nome deste Pokemon? *(O chat terá ${seg} segundos para responder)* `,
				resposta: tools.formatName(data.name),
				respostaBr : pokePtBr[0].nome,
			};
			const filt = r => {
				return item.resposta.some(answer => answer.toLowerCase() === r.content.toLowerCase());
			};
			msg.channel.send(item.pergunta).then(() => {
				msg.channel.send(data.sprites.front_default);

				const msg_filter = (m) => m.author.id === msg.author.id;
				msg.channel.awaitMessages({ filter: msg_filter, max: 1, time: seg * 1000, errors:['time'] })
					.then((collected) => {
						console.log('wait', collected);
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
