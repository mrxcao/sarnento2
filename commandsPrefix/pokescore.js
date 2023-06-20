const pokeApi = require('../src/apis/pokeapi');
module.exports = (client, msg) => {
	pokeApi.getPokeScore(msg.guildId, msg);
};
