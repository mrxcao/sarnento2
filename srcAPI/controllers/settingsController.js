const settingsCtrl = require('../../DB/mongo/controllers/settings');

const set = async (req, res, next) => {
	console.log('1',1);
	try {
		const save = await settingsCtrl.upSert(req.body);
		res.send(save);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};
const get = async (req, res, next) => {
	try {
		const result = await settingsCtrl.index();
		res.send(result);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};

module.exports = {
	get, set
};

