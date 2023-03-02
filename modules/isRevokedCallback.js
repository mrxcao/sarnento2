// const mongo = require('../modules/mongo');

module.exports = async (req, payload, done) => {
	const rotasIgnorar = [
		'/login',
		'/logout',
	];
	const ch = rotasIgnorar.filter(r => {return (req.url.indexOf(r) > -1); }).length > 0 ? false : true;
	if (ch) {
		if (payload.jti) {
			// const r = await mongo.findOne('sarnento2', 'jwtTokensRevogados', { idToken: payload.jti });
			if (r) return done(null, true);
		}
	}
	return done(null, false);
};

