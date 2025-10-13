const model = require('../models/users.js');
const blackList = [];
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
	async get(id) {
		return await model.findOne({ id }) ;
	}
	async getByLogin(login) {
		// console.log('login', login);
		return await model.findOne({ login }) ;
	}
	async getUserName(id) {
		const data = await model.findOne({ id }) ;
		if (data == null || !data) return '<?>';
		return data.username;
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

	/*
	async doLogin(req, res) {
		try {
			const { login, password } = req.body;
			const usr = await usersCtrl.get({ login });
			if (usr) {
				const pswBanco = usr.password;

				//  const a = crypto.decrypt(pswBanco);
				const b = crypto.encrypt(password);
				if (b === pswBanco) {
					const payload = {
						id: usr.id,
						username: usr.username,
						avatar: usr.avatar,
					};
					const token = jwt.sign(payload, secret, tokenOptions);
					res.send({ ok: true, token });
				}
				else {
			  res.sendStatus(401);
				}
		  }
		  else {
				res.sendStatus(401);
		  }
		}
		catch (error) {
		  res.status(500).send(error.toString());
		}
	  }

	async doLogout(req, res, next) {
		blackList.push(req.headers.authorization);
		res.sendStatus(200);
	}
*/
	async inBlackList(token) { blackList.some((t) => t === token);}


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