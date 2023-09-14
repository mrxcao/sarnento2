const pokeApi = require('../modules/apis/pokeapi');
module.exports = (client, msg) => {
	pokeApi.quiz(msg);
};
