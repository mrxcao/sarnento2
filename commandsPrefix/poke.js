const pokeApi = require('../src/apis/pokeapi');
module.exports = (client, msg) => {
	pokeApi.quiz(msg);
};
