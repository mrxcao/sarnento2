const { clog } = require('../../../modules/tools.js');
const model = require('../models/users.js');

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
			id: req.id,
			bot: req.bot,
			system: req.system,
			flags: req.flags,
			username: req.username,
			discriminator: req.discriminator,
			avatar: req.avatarURL(),
			banner: req.banner,
			acc:req.acc,
			atualizado: new Date(),
		};


		const query = { 'id':req.id };
		const ret = model.findOneAndUpdate(query, data, { upsert: true });
		// return res.status(200).json(ret);
		return ret;
	}

	async login(req) {
		const data = {
			login: req.login,
			password: req.password,
		};

		const usr = await model.find({ 'login': data.login }) ;
		if (usr.length > 0) {
			if (usr[0].password == data.password) {
				return usr[0];
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

}

module.exports = new UsersController();