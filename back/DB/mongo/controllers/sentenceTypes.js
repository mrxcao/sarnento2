const model = require('../models/sentenceTypes.js').model;

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
		const ret = await model.find({ id });
		return ret;
	}
	async update(req) {
		const query = { 'id':req.id };
		const ret = await model.findOneAndUpdate(query, req);
		return ret;
	}
	async destroy() {
		//
	}
}

module.exports = new UsersController();