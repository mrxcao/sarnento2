const reactClt = require('../DB/mongo/controllers/react');
const { randomInteger } = require('./tools');


let reacts = [];
const load = async () => {
	reacts = await reactClt.index();
};
const reply = async (msg, text) => {
	msg.reply({ content: text,
		// tts:true,
	});
};

const verify = async (args, msg) => {
	let match = false;
	for (const rct of reacts) {
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
		default:
			break;
		}


		if (match) {
			switch (rct.do.id) {
			// reply
			case 2:
				if (Array.isArray (rct.do.data.say)) {
					const text = rct.do.data.say[randomInteger (rct.do.data.say.length) ];
					await reply(msg, text);
				}
				else {
					await reply(msg, rct.do.data.say);
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