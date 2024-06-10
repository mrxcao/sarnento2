const pokeApi = require('../services/pokeapi');
module.exports = (client, msg) => {
	pokeApi.quiz(msg);
};
