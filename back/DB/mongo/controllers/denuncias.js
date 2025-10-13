const model = require('../models/denuncias.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		return ret;
	}
	async index() {
		const ret = await model.find({ }) ;
		return ret;
	}
	async get(id) {
		return await model.findOne({ id }) ;
	}
	async update() {
		//
	}
	async destroy() {
		//
	}
		
	async getMax() {
		const data = await model.aggregate([
			{ $group: { _id:null, count:{ $sum:1 } } },
		]);
		if (data.length != 0) {
			return data[0].count;
		}
		else {
			return 0;
		}
	}
}

module.exports = new UsersController();