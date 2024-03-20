const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const token = process.env.TELEGRAM_TOKEN;
const chatID = process.env.TELEGRAM_CHAT_ID;
const status = require('../../modules/status');

let bot;
const init = async () => {
	bot = new Telegraf(token);
	bot.launch();

	bot.on(message('text'), async (ctx) => {
		let text;
		switch (ctx.message.text) {
		case 'status':
			text = await status.get(0);
			// 'ok  **TESTE**   *teste*  __123__   <b>texto</b>';
			break;

		default:
			break;
		}

		// console.log('ctx', ctx.message);
		send(text);
	});

	// console.log(`https://api.telegram.org/bot${token}/getUpdates`);
	console.log('Telegram bot: ON ');

	return true;
};

const send = async (text) => {
	bot.telegram.sendMessage(chatID, text, { parse_mode: 'Markdown' });
};

module.exports = { init, send };