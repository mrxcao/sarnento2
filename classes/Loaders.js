const mongo = require('../DB/mongo/connect');
const server = require('../src/init');
class Loaders {
	async init() {
		await mongo.connect();
		if (process.env.NODE_ENV == 'development') {
			await server.init();
		}
	}

}

module.exports = new Loaders();