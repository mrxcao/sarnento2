const mongo = require('../DB/mongo/connect');
const telegram = require('../modules/apis/telegram');


class Loaders {
	async init() {
		await mongo.connect();
		await telegram.init();
	}

}

module.exports = new Loaders();