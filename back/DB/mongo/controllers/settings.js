const model = require('../models/settings');
class SettingsController {
	async store(req) {
		return await model.create(req);
		// return res.status(200).json(ret);
	}
	async setUptime() {
		return await model.findOneAndUpdate({ }, { lastUpTime: new Date() }, { upsert: true });
	}
	async index() {
		return await model.find({ }) ;
		// return res.status(200).json(ret);
	}
	async show() {
		return await model.find({ }) ;
	}
	async update() {
		//
	}
	async destroy() {
		//
	}

	async upSert(req) {
		console.log('req',req);
		const data = {
			sinopseForAI: req.sinopseForAI,
			tempoGuardaDias: req.tempoGuardaDias,
			avisarCalls: req.avisarCalls,
			ai: req.ai,
			notLog: req.notLog,
		  	atualizado: new Date(),
		};
	
		const query = {}; //  { id: req.id };
		const ret = model.findOneAndUpdate(query, data, { upsert: true, new: true });
		// return res.status(200).json(ret);
		return ret;
	  }	
}

module.exports = new SettingsController();