const model = require('../models/triggerTypes.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		return ret;
	}
	async index() {
		const ret = await model.find({ }) ;
		return ret;
	}
	async show(id) {
		const ret = await model.find({ id }) ;
		return ret;
	}
	async update() {
		//
	}
	async destroy() {
		//
	}
}

module.exports = new UsersController();