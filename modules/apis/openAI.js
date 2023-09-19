const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_API_ORG;

const openai = new OpenAI({
	organization, apiKey,
	logLevel: 'none',
});


const perguntar = async (msg, pergunta) => {
	const usr = msg.author.username;
	const LogMsgs = [
		{
			'instruction': 'Instruções para o modelo',
			'context': 'Contexto relevante ou informações adicionais',
		}	];

	const params = OpenAI.Chat.ChatCompletionCreateParams = {
		messages: [
			{ role: 'system', content: `Seu nome é Sarnento e você é uma persona de um cachorro. A entrada é a mensagem de um usuário do Discord que está interagindo com você. Responda de maneira curta e informal, o promp será sempre estruturado desta forma: <USUÁRIO QUE FAZ A PERGUNTA>:<PERGUNTA>, não responda neste formato. 
			        Dados para levar em consideração na resposta se for necessário: ${LogMsgs}` },
			{ role: 'user', content: `${usr}: ${pergunta}` },
		],
		model: 'gpt-4',
	};
	const completion = OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
	const resposta = completion.choices[0].message.content;
	// console.log('completion', completion);
	return resposta;
};


module.exports = { perguntar };
