const openAI = require('../modules/apis/openAI');
module.exports = (client, msg) => {
	openAI.teste(msg);
};
