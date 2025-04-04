const jwt = require('jsonwebtoken');
const { inBlackList } = require('../controllers/userController');

const secret = process.env.JWT_SECRET;
const debugMode = process.env.NODE_ENV === 'Development' ? true : false;

module.exports = (req, res, next) => {
	// eslint-disable-next-line dot-notation
	let token = req.headers.authorization;
	if (token) {
		token = token.replace('Bearer ', '');
		try {
			const decoded = jwt.verify(token, secret);
			if (decoded) {
				if (!inBlackList(token)) {
					res.locals.tokon = decoded;
					return next();
				}
			}
		}
		catch (error) {
			if (debugMode) console.error(error);
		}
	}
	res.sendStatus(401);
};
