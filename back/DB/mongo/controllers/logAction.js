const model = require('../models/logAction.js');

class LogActionController {
	async store(req) {
		return model.create(req);
	}
	async index() {
		return model.find({ });
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

	async get(id) {
		return model.findOne({ id });
	}
	async getFiltered(filters) {
		const matchStage = {};

		if (filters.guildId) {
			matchStage['guild.id'] = filters.guildId;
		}

		if (filters.userId) {
			matchStage['user.id'] = filters.userId;
		}

		if (filters.startDate || filters.endDate) {
			matchStage.data = {};
			if (filters.startDate) {
				matchStage.data.$gte = new Date(filters.startDate);
			}
			if (filters.endDate) {
				matchStage.data.$lte = new Date(filters.endDate);
			}
		}

		const pipeline = [
			{ $match: matchStage },
			{ $sort: { data: -1 } },
			{ $limit: 100 } 
		];

		console.log('pipeline', JSON.stringify(pipeline));

		return model.aggregate(pipeline);
	}
}

module.exports = new LogActionController();
