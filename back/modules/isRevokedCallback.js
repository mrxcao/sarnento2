// const mongo = require('./mongo');
const tokenCtrl = require('../DB/mongo/controllers/token');

module.exports = async (req, payload) => {
	const rotasIgnorar = [
		'/login',
		'/logout',
	];
	const ch = rotasIgnorar.filter(r => {return (req.url.indexOf(r) > -1); }).length > 0 ? false : true;
	if (ch) {
		if (payload.jti) {
			const r = await tokenCtrl.show({ idToken: payload.jti });
			if (r) return true;
		}
	}
	return false;
};

