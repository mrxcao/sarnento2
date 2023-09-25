const model = require('../models/config.js');
class UsersController {
	async store(req) {
		return await model.create(req);
		// return res.status(200).json(ret);
	}
	async index() {
		return await model.find({ }) ;
		// return res.status(200).json(ret);
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
	async upSert(req) {
		const data = {
			name: req.name,
			prefix: req.prefix,
			sinopse: req.sinopse,
			sinopseForAI: req.sinopseForAI,
			atualizado: new Date(),
		};


		const query = { '_id':req._id };
		const ret = model.findOneAndUpdate(query, data, { upsert: true });
		// return res.status(200).json(ret);
		return ret;
	}
	async get(_id) {
		return await model.findOne({ _id }) ;
	}

}

module.exports = new UsersController();