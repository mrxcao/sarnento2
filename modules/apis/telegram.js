const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const token = process.env.TELEGRAM_TOKEN;
const chatID = process.env.TELEGRAM_CHAT_ID;

let bot;
const init = async () => {
	bot = new Telegraf(token);
	bot.launch();

	bot.on(message('text'), async (ctx) => {
		console.log('ctx', ctx.message);
		send(ctx.message.text);
	});

	// console.log(`https://api.telegram.org/bot${token}/getUpdates`);
	console.log('Telegram bot: ON ');

	return true;
};

const send = async (text) => {
	bot.telegram.sendMessage(chatID, text);
};

module.exports = { init, send };