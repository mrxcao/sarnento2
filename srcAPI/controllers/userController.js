/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('../../modules/crypto');
const usersCtrl = require('../../DB/mongo/controllers/users');


const blackList = [];
const secret = process.env.JWT_SECRET;
const tokenOptions = {
	expiresIn: parseInt(process.env.JWT_EXPIRES, 10),
};


const insert = async (req, res, next) => {
	try {
		const save = await usersCtrl.upSert(req.body);
		res.send(save);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};
const get = async (req, res, next) => {
	try {
		const result = await usersCtrl.index();
		res.send(result);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};

const doLogin = async (req, res, next) => {
	try {
		const { login, password } = req.body;
		const usr = await usersCtrl.getByLogin(login);
		if (usr) {
			const pswBanco = usr.password;

			const b = crypto.encrypt(password);
			if (b === pswBanco) {
				console.log('secret', secret);
				const payload = {
					id: usr.id,
					username: usr.username,
					avatar: usr.avatar,
				};
				const token = jwt.sign(payload, secret, tokenOptions);
				res.send({ ok: true, token });
			}
			else {
				res.sendStatus(401);
			}
		}
		else {
			res.sendStatus(401);
		}
	}
	catch (error) {
		console.log('error', error);
		res.status(500).send(error.toString());
	}
};
const doLogout = async (req, res, next) => {
	blackList.push(req.headers.authorization);
	res.sendStatus(200);
};

const inBlackList = (token) => blackList.some((t) => t === token);

module.exports = {
	insert, get, doLogin, doLogout, inBlackList,
};

