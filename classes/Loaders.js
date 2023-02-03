const mongo = require('../DB/mongo/connect');

class Loaders {
	async init() {
		await mongo.connect();
	}
}

module.exports = new Loaders();