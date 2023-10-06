const model = require('../models/logMessages.js');
class UsersController {
	async store(req) {
		return await model.create(req);
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
			idUSr: req.idUSr,
			idGuild: req.idGuild,
			idChannel: req.idChannel,
			msg: req.msg,
			msgForAI: req.msgForAI,
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

	async getGuildsMsgs(idGuild) {
		const data = await model.aggregate([
			{ $match: { idGuild } },
			{ $sort: { criado:1 } },
			{ $project: { _id:0, msgForAI:1 } },
		]);
		let res;
		for (const d of data) {
			res = res + `${d.msgForAI}\n\r`;
		}
		return res;

	}


}

module.exports = new UsersController();