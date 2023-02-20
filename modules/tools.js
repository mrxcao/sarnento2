const moment = require('moment');
moment.locale('pt-br');

const clog = (msg, plus = '', plus2 = '', plus3 = '') => {
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), msg, plus, plus2, plus3);
};
const replyLines = (times = 50, charR = '-') => {
	console.log(`${charR.repeat(times)}`);
};
const beep = () => {
	// n dei conta
};
const randomInteger = (max) => {
	return Math.floor(Math.random() * (max + 1));
};
const formatName = (str, type = 1) => {
	let nstr = str.replace(/[_]/g, ' ');
	switch (type) {
	case 1:
		// primeira maiúsca e resto minúscula
		nstr = nstr.charAt(0).toUpperCase() + nstr.slice(1);
		break;
	default:
		break;
	}
	return nstr;
};

const randomRgbColor = () => {
	const r = randomInteger(255);
	const g = randomInteger(255);
	const b = randomInteger(255);
	return [r, g, b];
};
const rgbToInt = (r, g, b) => {
	return 65536 * r + 256 * g + b;
};
const applyCanvasText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;
	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};


module.exports = { clog,
	replyLines,
	beep,
	randomInteger,
	randomRgbColor,
	rgbToInt,
	formatName,
	applyCanvasText,
};