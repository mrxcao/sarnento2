const model = require('../models/react.js');

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
	async destroy(_id) {
		const ret = await model.deleteOne({ _id });
		return ret;
	}
}

module.exports = new UsersController();
