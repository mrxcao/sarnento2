const OpenAI = require('openai');
const log = require('../log');
const apiKey = process.env.OPENAI_API_KEY;
const organization = process.env.OPENAI_API_ORG;
const debugMode = process.env.DEBUG === 'true' ? true : false;
const cttrlLogTokenSize = require('../../DB/mongo/controllers/logTokenSize');
const openai = new OpenAI({
	organization, apiKey,
	logLevel: 'none',
});


const perguntar = async (msg, pergunta) => {
	const tokenLimit = 70000;
	let resultado = false;
	const msgs = await log.getMessagesGuild(msg.guildId);
	const usr = msg.author.username;
	const c = 0;
	while (tokenLimit > 0 && resultado == false) {
		// try {

		const systemContent = `Seu nome é Sarnento e você é uma persona de um cachorro caramelo bem inteligente, que sempre lembra de tudo e camarada, seu dono é o MrXcao, 
	um homem adulto que faz aniversário dia 9 de março. 
	A entrada é a mensagem de um usuário do Discord que está interagindo com você. 
	Responda de maneira curta e informal, o prompt será sempre estruturado desta forma: <USUÁRIO QUE FAZ A PERGUNTA>:<PERGUNTA>, não responda neste formato. 
	Tente sempre usar o histório de mensagens do servidor para formular a resposta pois você está participando de uma conversa.
	Atentar mais aos detalhes da conversa e responder da forma mais precisa possível. 
	Evitar a resposta, desculpe, sou um cão.
	Você pode enviar links.
	Segue mensagens do servidor :\n`;
		const userContent = `${usr}: ${pergunta}`;

		let cut = msgs.substring(msgs.length - tokenLimit, msgs.length);
		cut = cut.substring(cut.indexOf('@') - 17, 99999999);
		cut = systemContent + cut;
		// console.log('cut', cut);
		const params = OpenAI.Chat.ChatCompletionCreateParams = {
			model: 'gpt-4',
			stream: true,
			messages: [
				{ role: 'system', content: cut },
				{ role: 'user',	content: userContent },
			],
		};


		// return 'ok';
		// const completion = OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

		/*
			const completion = await openai.chat.completions.create(params);
			console.log('||||| completion', completion);
*/

		try {
			console.log('1', 1);
			const completion = await openai.chat.completions.create(params);
			console.log('1', 2);
			const resposta = completion.choices[0].message.content;
			console.log('1', 3);
			resultado = true;
			console.log('1', 4);
			cttrlLogTokenSize.store({ ai:'openAI', size: tokenLimit });
			console.log('1', 5);
			return resposta;
		}
		catch (error) {
			let err;
			if (error.code === 'insufficient_quota') {
				resultado = true;
				err = 'Você excedeu sua cota de uso da API da OpenAI. Por favor, verifique seu plano e detalhes de faturamento.';
			}
			else {
				err = error;
			}
			console.log('perguntar OpenAI -> err', err);
		}
		/* }

		catch (error) {
			debugMode ? console.log('error', tokenLimit, error) : true;
			tokenLimit = tokenLimit - 2000;

		}
		*/
	}
};


module.exports = { perguntar };

