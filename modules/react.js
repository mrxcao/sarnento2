const reactClt = require('../DB/mongo/controllers/react');
const coingecko = require('../src/apis/coingecko');
const tools = require('../modules/tools');
const { randomInteger } = require('./tools');


let reacts = [];
const load = async () => {
	reacts = await reactClt.index();
};
const reply = async (msg, text) => {
	if (text) {
		msg.reply({ content: text,
		// tts:true,
		});
	}
};
const say = async (msg, text) => {
	if (text) {
		msg.channel.send(text);
	}
};

const verify = async (args, msg) => {
	let match = false;
	for (const rct of reacts) {
		match = false;
		let times = 0;
		switch (rct.trigger.id) {
		// single word
		case 1:
			if (Array.isArray (rct.trigger.data.word)) {
				for (const tD of rct.trigger.data.word) {
					for (const arg of args) {
						if (await tools.normalizarStr(arg) == await tools.normalizarStr(tD)) {
							match = true;
							break;
						}
					}
				}
			}
			else if (args.indexOf(e => tools.normalizarStr(e) == tools.normalizarStr(rct.trigger.data.word)) > -1) {
				match = true;
			}
			break;
		// group of words
		case 2:
			times = 0;
			for (const tD of rct.trigger.data.wordArray) {
				for (const arg of args) {
					if (await tools.normalizarStr(arg) == await tools.normalizarStr(tD)) {
						times = times + 1;
						break;
					}
				}
			}


			if (times == rct.trigger.data.wordArray.length) {
				match = true;
			}
			break;
		// phrase
		case 3:
			if (String(await tools.normalizarStr(msg.content)).indexOf(await tools.normalizarStr(rct.trigger.data.phrase)) > -1) {
				match = true;
			}
			break;
		default:
			break;
		}

		if (match) {
			let resultText;
			switch (rct.do.id) {
			// say
			case 1:
				if (Array.isArray (rct.do.data.say)) {
					const l = rct.do.data.say.length;
					const n = randomInteger (l);
					const text = rct.do.data.say[n == l ? n - 1 : n ];
					// const text = rct.do.data.say[randomInteger (rct.do.data.say.length) - 1 ];
					await say(msg, text);
				}
				else {
					await say(msg, rct.do.data.say);
				}
				break;
			// reply
			case 2:
				if (Array.isArray (rct.do.data.say)) {
					const l = rct.do.data.say.length;
					const n = randomInteger (l);
					const text = rct.do.data.say[n == l ? n - 1 : n ];
					await reply(msg, text);
				}
				else {
					await reply(msg, rct.do.data.say);
				}
				break;
			// useFunction
			case 3:
				switch (rct.do.data.function) {
				case 'precoBitcoin':
					resultText = await coingecko.bitcoin();
					await reply(msg, resultText);
					break;
				case 'precoDolar':
					console.log('precoDolar', 1);
					resultText = await coingecko.dolar();
					console.log('precoDolar', resultText);
					await reply(msg, resultText);
					break;
				default:
					break;
				}
				break;
			default:
				break;
			}
		}
	}


};

load();

module.exports = { verify };