const model = require('../models/settings.js');
class UsersController {
	async store(req) {
		return await model.create(req);
		// return res.status(200).json(ret);
	}
	async setUptime() {
		return await model.findOneAndUpdate({ }, { lastUpTime: new Date() }, { upsert: true });
	}
	async index() {
		return await model.find({ }) ;
		// return res.status(200).json(ret);
	}
	async show() {
		return await model.find({ }) ;
	}
	async update() {
		//
	}
	async destroy() {
		//
	}
}

module.exports = new UsersController();