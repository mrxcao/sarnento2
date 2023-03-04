// const mongo = require('../modules/mongo');
const tokenCtrl = require('../DB/mongo/controllers/token');

module.exports = async (req, payload, done) => {
	const rotasIgnorar = [
		'/login',
		'/logout',
	];
	const ch = rotasIgnorar.filter(r => {return (req.url.indexOf(r) > -1); }).length > 0 ? false : true;
	if (ch) {
		if (payload.jti) {
			const r = await tokenCtrl.show({ idToken: payload.jti });
			if (r) return done(null, true);
		}
	}
	return done(null, false);
};

