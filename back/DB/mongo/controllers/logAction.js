const model = require('../models/logAction.js');

class LogActionController {
	async store(req) {
		return model.create(req);
	}
	async index() {
		return model.find({ });
	}

	async show() {
		//
	}

	async update() {
		//
	}

	async destroy() {
		//
	}

	async get(id) {
		return model.findOne({ id });
	}
}

module.exports = new LogActionController();
