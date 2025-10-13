const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const token = process.env.TELEGRAM_TOKEN;
const chatID = process.env.TELEGRAM_CHAT_ID;
const status = require('../modules/status');
const tools = require('../modules/tools');

const isOn = process.env.NODE_ENV != 'development'  ? true : false;

let bot;
const init = async () => {
	if (isOn) {
		bot = new Telegraf(token);
		bot.launch();

		bot.on(message('text'), async (ctx) => {
			if (ctx.message && ctx.message.text) {
				let text;
				const msg = await tools.normalizarStr(ctx.message.text);
				switch (msg) {
				case 'status':
					text = await status.get(0);
					break;
				default:
					break;
				}

				// console.log('ctx', ctx.message);
				if (text) send(text);
			}
		});

		// console.log(`https://api.telegram.org/bot${token}/getUpdates`);
		console.log('Telegram bot: ON ');
	} else {
		console.log('Telegram bot: OFF ');
	}
	return true;
};

const send = async (text) => {
	if (isOn) bot.telegram.sendMessage(chatID, text, { parse_mode: 'Markdown' });
};

module.exports = { init, send };