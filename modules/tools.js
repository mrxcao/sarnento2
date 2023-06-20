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
const randomInteger = (max, podeZero = false) => {
	const res = Math.floor(Math.random() * (max + 1));
	if (res == 0 && !podeZero) {
		return randomInteger(max);
	}
	return res;
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

const newDate = (d) => {
	const novaData = new Date(new Date(d).getTime() - 180 * 60 * 1000);
	return (novaData);
};
const searchInArrayObj = async (arr, key, StrtoSearch) => {
	if (!arr) {
		return [];
	}
	const results = [];
	let idxKey = [];
	let i = -1;
	for (const k in arr[0]) {
		i++;
		if (k == key) {idxKey = i;}
	}
	for (const a of arr) {
		const value = a[Object.keys(a)[idxKey]];
		const isRx = await isRegExp(value);
		let rx = new RegExp();
		let isRegExValid = false;
		if (isRx) {
			rx = new RegExp(value);
			isRegExValid = rx.exec(StrtoSearch);
		}
		// console.log('StrtoSearch , value', StrtoSearch, value);
		if (StrtoSearch == value || isRegExValid) {
			results.push(a);
		}

	}
	// console.log('results', results);
	return results;
};
const isRegExp = async (str) => {
	return typeof str === 'object' ? true : false;
};
const formatarMoeda = async (valor, tipo = 'BRL') => {
	tipo = tipo.toUpperCase();

	let lang;
	let erase;
	switch (tipo) {
	case 'BRL':
		lang = 'pt-BR';
		erase = 'R$';
		break;
	case 'USD':
		lang = 'en-US';
		erase = '$';
		break;
	default:
		break;
	}

	const formatter = new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: tipo,
		minimumFractionDigits: 2,
	});
	let result = formatter.format(valor);
	result = result.replace(erase, '').trim();
	return result;
};
const normalizarStr = async (texto) => {
	const result = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
	// console.log('normalizarStr result ', result);
	return result;
};
const tabular = async (texto, tamanho, alinhamento = 1) => {
	let res = '';
	switch (alinhamento) {
	// esquerda
	case 1:
		res = String(texto).padEnd(tamanho, ' ');
		break;
	// direita
	case 2:
		res = String(texto).padStart(tamanho, ' ');
		break;
	// Centro
	case 3:
		res = String(texto).padCenter(tamanho, ' ');
		break;
	default:
		break;
	}
	return res;
};

module.exports = {
	tabular,
	clog,
	replyLines,
	beep,
	randomInteger,
	randomRgbColor,
	rgbToInt,
	formatName,
	newDate,
	searchInArrayObj,
	isRegExp,
	formatarMoeda,
	normalizarStr,
};