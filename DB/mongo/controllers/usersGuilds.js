const model = require('../models/usersGuilds');

class UsersGuildsController {
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
	async upSert(userId, guildId) {
		const data = {
			userId,
			guildId,
			atualizado: new Date(),
		};
		const query = { userId, guildId };
		const ret = model.findOneAndUpdate(query, data, { upsert: true });
		return ret;
	}
	async get(id) {
		return await model.findOne({ id }) ;
	}


}

module.exports = new UsersGuildsController();