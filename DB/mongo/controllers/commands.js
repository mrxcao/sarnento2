const model = require('../models/commands.js');

class CommandsController {
	async store(req) {
		const ret = await model.create(req);
		// return res.status(200).json(ret);
		return ret;
	}
	async index(query = {}) {
		const ret = await model.find(query) ;
		return ret;
	}
	async show(_id) {
		const ret = await model.findById(_id) ;
		return ret;
	}
	async update(_id, req) {
		const ret = await model.findByIdAndUpdate(_id, req);
		return ret;
	}
	async destroy(_id) {
		const ret = await model.findByIdAndDelete(_id);
		return ret;
	}
	async upSert(req) {
		const query = { 'nome':req.nome };
		const ret = model.findOneAndUpdate(query, req, { upsert: true });
		return ret;
	}
}

module.exports = new CommandsController();