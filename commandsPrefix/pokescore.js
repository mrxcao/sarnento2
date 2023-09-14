const pokeApi = require('../modules/apis/pokeapi');
module.exports = (client, msg) => {
	pokeApi.getPokeScore(msg.guildId, msg);
};
