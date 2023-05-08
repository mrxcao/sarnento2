const reactClt = require('../DB/mongo/controllers/react');
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
					if (args.find(e => e.toLowerCase() == tD.toLowerCase() ||
					String(e.toLowerCase()).indexOf(tD.toLowerCase()) > -1)) {
						match = true;
						break;
					}
				}
			}
			else if (args.find(e => e.toLowerCase() == rct.trigger.data.word.toLowerCase() ||
				String(e.toLowerCase()).indexOf(rct.trigger.data.word.toLowerCase()) > -1)) {
				match = true;
				break;
			}
			break;
		// group of words
		case 2:
			times = 0;
			for (const tD of rct.trigger.data.wordArray) {
				if (args.find(e => e.toLowerCase() == tD.toLowerCase() ||
				String(e.toLowerCase()).indexOf(tD.toLowerCase()) > -1)) {
					times = times + 1;

				}
			}
			if (times == rct.trigger.data.wordArray.length) {
				match = true;
			}
			break;
		// phrase
		case 3:
			if (msg.content.toLowerCase().indexOf(rct.trigger.data.phrase.toLowerCase()) > -1) {
				match = true;
			}
			break;
		default:
			break;
		}

		if (match) {
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
			case 3:
				break;
			default:
				break;
			}
		}
	}


};

load();

module.exports = { verify };