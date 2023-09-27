const OpenAI = require('openai');
const log = require('../log');
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_API_ORG;

const openai = new OpenAI({
	organization, apiKey,
	logLevel: 'none',
});


const perguntar = async (msg, pergunta) => {
	const msgs = await log.getMessagesGuild(msg.guildId);
	const usr = msg.author.username;

	const params = OpenAI.Chat.ChatCompletionCreateParams = {
		model: 'gpt-4',
		messages: [
			{ role: 'system',
				content: `Seu nome é Sarnento e você é uma persona de um cachorro caramelo bem inteligente, que sempre lembra de tudo e camarada, seu dono é o MrXcao, 
			um homem adulto que faz aniversário dia 9 de março. 
			A entrada é a mensagem de um usuário do Discord que está interagindo com você. 
			Responda de maneira curta e informal, o prompt será sempre estruturado desta forma: <USUÁRIO QUE FAZ A PERGUNTA>:<PERGUNTA>, não responda neste formato. 
			Tente sempre usar o histório de mensagens do servidor para formular a resposta pois você está participando de uma conversa.
			Atentar mais aos detalhes da conversa e responder da forma mais precisa possível. 
			Evitar a resposta, desculpe, sou um cão.
			Você pode enviar links.
			Segue mensagens do servidor :\n ${msgs}` },
			{ role: 'user',
				content: `${usr}: ${pergunta}` },
		],

	};
	const completion = OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
	const resposta = completion.choices[0].message.content;
	// console.log('completion', completion);
	return resposta;
};


module.exports = { perguntar };
