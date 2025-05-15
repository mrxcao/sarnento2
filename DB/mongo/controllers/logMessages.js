const model = require('../models/logMessages.js');
const usersCtrl = require('./users.js');
const guildsCtrl = require('./guilds.js');
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
			{ $sort: { criado:-1 } },
			{ $limit:  200 },
			{ $sort: { criado:1 } },
			{ $project: { _id:0, msgForAI:1 } },
		]);
		let res;
		for (const d of data) {
			res = res + `${d.msgForAI}\n\r`;
		}
		return res;
	}
	async getGuildsMsgs2(idGuild) {
		const data = await model.aggregate([
			{ $match: { idGuild } },
			{ $sort: { criado:-1 } },
			{ $limit:  100 },
			{ $sort: { criado:1 } },
			{ $project: { _id:0, msgForAI:1, idUSr:1, msg:1 } },
		]);
		return data;
	}

	async getLasts(qtde) {
		const data = await model.aggregate([
			{ $sort: { _id:-1 } },
			{ $limit:  qtde },
			// { $project: { _id:0, msgForAI:1 } },
		]);
		for (const d of data) {
			d.user = await usersCtrl.get(d.idUSr);
			d.guild = await guildsCtrl.get(d.idGuild);
			//
			// d.idChannel
		}
		return data;
	}

}

module.exports = new UsersController();