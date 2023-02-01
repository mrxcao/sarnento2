const model = require('../models/commands.js');

class CommandsController {
	async store(req) {
		const ret = await model.create(req);
		// return res.status(200).json(ret);
		return ret;
	}
	async index(query = {}) {
		const ret = await model.find(query) ;
		// return res.status(200).json(ret);
		return ret;
	}
	async show(_id) {
		const ret = await model.findById(_id) ;
		// return res.status(200).json(ret);
		return ret;
	}
	async update() {
		//
	}
	async destroy() {
		//
	}
	async upSert(req) {
		const query = { 'nome':req.nome };
		const ret = model.findOneAndUpdate(query, req, { upsert: true });
		// return res.status(200).json(ret);
		return ret;
	}
}

module.exports = new CommandsController();