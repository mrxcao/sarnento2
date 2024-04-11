const model = require('../models/guilds.js');

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
			id: req.id,
			name: req.name,
			icon:req.icon,
			available:req.available,
			memberCount: req.memberCount,
			atualizado: new Date(),
			preferredLocale : req.preferredLocale,
		};


		const query = { 'id':req.id };
		const ret = model.findOneAndUpdate(query, data, { upsert: true });
		// return res.status(200).json(ret);
		return ret;
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