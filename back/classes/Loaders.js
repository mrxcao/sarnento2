const mongo = require('../DB/mongo/connect');
const telegram = require('../services/telegram');
const server = require('../srcAPI/init');
class Loaders {
	async init(type) {
		switch (type) {
		// bot
		case 1:
			await telegram.init();
			break;
		// API
		case 2:
			await server.init();
			break;

		default:
			console.log('1', 1);
			break;
		}
		await mongo.connect();
	}

}

module.exports = new Loaders();