const ctrl = require('../../DB/mongo/controllers/denuncias');

const set = async (req, res, next) => {
	try {
	const save = await ctrl.store(req.body);
		res.send(save);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};
const get = async (req, res, next) => {
	try {
		const result = await ctrl.index();
		res.send(result);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};
const setSettings = async (req, res, next) => {
	try {
		console.log(`| 1 - ${1}`);
	const save = await ctrl.setSettings(req.body);
		res.send(save);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};
module.exports = {
	get, set, setSettings
};

