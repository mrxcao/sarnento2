const model = require('../models/pokeScore.js');

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
	async show(id) {
		const ret = await model.find({ id }) ;
		// return res.status(200).json(ret);
		return ret;
	}
	async getScore(guildId) {
		const ret = await model.aggregate([
			{ $match: { guildId } },
			{ $sort: { score:-1 } },
		]);
		return ret;
	}
	async addPoint(userId, guildId, points = 1) {
		const exist = await model.find({ userId, guildId });
		if (exist.length > 0) {
			const ret = await model.updateOne({ userId, guildId }, { $inc: { score: points } });
			return ret;
		}
		else {
			const ret = await model.create({ userId, guildId, score: points });
			return ret;
		}
	}
	async update() {
		//
	}
	async destroy() {
		//
	}
}

module.exports = new UsersController();