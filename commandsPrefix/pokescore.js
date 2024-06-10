const pokeApi = require('../services/pokeapi');
module.exports = (client, msg) => {
	pokeApi.getPokeScore(msg.guildId, msg);
};
