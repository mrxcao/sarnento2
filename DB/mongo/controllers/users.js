const model = require('../models/users.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		// return res.status(200).json(ret);
		return ret;
	}
	async index() {
		const ret = await model.find({ 'nome':'fala' }) ;
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
			bot: req.bot,
			system: req.system,
			flags: req.flags,
			username: req.username,
			discriminator: req.discriminator,
			avatar: req.avatar,
			banner: req.banner,
			acc:req.acc,
			atualizado: new Date(),
		};


		const query = { 'id':req.id };
		const ret = model.findOneAndUpdate(query, data, { upsert: true });
		// return res.status(200).json(ret);
		return ret;
	}
}

module.exports = new UsersController();