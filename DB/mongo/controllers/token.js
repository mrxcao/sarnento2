const model = require('../models/token.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		// return res.status(200).json(ret);
		return ret;
	}
	async index() {
		const ret = await model.find({ }) ;
		// return res.status(200).json(ret);
		return ret;
	}
	async show(id) {
		const ret = await model.find({ id }) ;
		// return res.status(200).json(ret);
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