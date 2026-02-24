const model = require('../models/guilds.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		// return res.status(200).json(ret);
		return ret;
	}
	async index(filters) {
        const query = {};
        if (filters) {
            if (filters.name) {
                query.name = { $regex: filters.name, $options: 'i' };
            }
            if (filters.id) {
                query.id = filters.id;
            }
        }
		const ret = await model.find(query).sort({ criado: 1 });
		// return res.status(200).json(ret);
		return ret;
	}
	async get(id) {
		return await model.findOne({ id }) ;
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
	async setSettings(req) {
		if (req.id) {
			let data = {settings:{}}
			if (req.channelIdNotification ) data.settings.channelIdNotification = req.channelIdNotification
			if (req.channelIdComplaint ) data.settings.channelIdComplaint = req.channelIdComplaint
			const ret = model.findOneAndUpdate({ 'id':req.id }, data, { upsert: true });
			return ret;
		} else {
			return false
		}
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