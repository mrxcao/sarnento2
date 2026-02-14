const model = require('../models/react.js');

class UsersController {
	async store(req) {
		const ret = await model.create(req);
		return ret;
	}
	async index() {
		const ret = await model.find({ }).collation({ locale: 'pt', strength: 2 }).sort({ name: 1 }) ;
		return ret;
	}
	async show(id) {
		const ret = await model.find({ id }) ;
		return ret;
	}
	async update(req) {
		const query = { '_id': req._id };
		try {
			// Using $set to avoid overwriting with incomplete data or schema validation issues on root
			// But since req is the whole object, we can just pass it. 
			// However, to be safer with mongoose nested schemas:
            delete req._id; // avoid updating _id
			const ret = await model.findOneAndUpdate(query, { $set: req }, { new: true });
			return ret;
		} catch (e) {
			console.error('Update Error:', e);
			throw e;
		}
	}
	async destroy(_id) {
		const ret = await model.deleteOne({ _id });
		return ret;
	}
}

module.exports = new UsersController();
