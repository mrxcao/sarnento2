const mongo = require('../modules/DB/mongo');

class Loaders {
	async init() {
		await mongo.connect();
	}
}

module.exports = new Loaders();