const aes = require('aes-js');

const key = aes.utils.utf8.toBytes(process.env.AES_KEY);
if (key.length !== 32) throw new Error(`Invalid AES key ${key.length}`);

const encrypt = (text) => {
	const b = aes.utils.utf8.toBytes(text);
	const aesCTR = new aes.ModeOfOperation.ctr(key);
	const by = aesCTR.encrypt(b);
	return aes.utils.hex.fromBytes(by);
};
const decrypt = (textHex) => {
	const by = aes.utils.hex.toBytes(textHex);
	const aesCTR = new aes.ModeOfOperation.ctr(key);
	const de = aesCTR.encrypt(by);
	return aes.utils.utf8.fromBytes(de);
};

module.exports = { encrypt, decrypt };
