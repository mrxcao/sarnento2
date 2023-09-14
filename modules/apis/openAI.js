const OpenAI = require('openai');
const { clog } = require('../tools');
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_API_ORG;

const openai = new OpenAI({
	organization, apiKey,
});


const teste = async (msg) => {
	const params = OpenAI.Chat.ChatCompletionCreateParams = {
		messages: [{ role: 'user', content: 'Quanto custa um PS5 hoje em dia no Brasil?' }],
		model: 'gpt-4',
	};
	const completion = OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
	const resposta = completion.choices[0].message.content;
	// console.log('completion', completion);
	console.log('msg', resposta);
};


module.exports = { teste };
