const { GoogleGenerativeAI } = require('@google/generative-ai');
const log = require('../modules/log');
const cttrlLogTokenSize = require('../DB/mongo/controllers/logTokenSize');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

const perguntar = async (msg, pergunta) => {

	let tokenLimit = 60000;
	let resultado = false;
	const msgs = await log.getMessagesGuild(msg.guildId);
	const usr = msg.author.username;
	// const c = 0;
	while (tokenLimit > 0 && resultado == false) {
		// try {

		const systemContent = `Seu nome é Sarnento e você é uma persona de um cachorro caramelo bem inteligente, que sempre lembra de tudo,          
	A entrada é a mensagem de um usuário do Discord que está interagindo com você. 
	Responda de maneira curta e informal, o prompt será sempre estruturado desta forma: <USUÁRIO QUE FAZ A PERGUNTA>:<PERGUNTA>, não responda neste formato. 
	Tente sempre usar o histório de mensagens do servidor para formular a resposta pois você está participando de uma conversa.
	Atentar mais aos detalhes da conversa e responder da forma mais precisa possível. 
	Evitar a resposta, desculpe, sou um cão.
	Você pode enviar links. O seu avatar foi criado pelo PH e o twitter dele é @PH101BR. Só use estas informações na resposta se for perguntado.
	Segue mensagens do servidor :\n`;
		const userContent = `${usr}: ${pergunta}`;

		let cut;
		// console.log('msgs.length > tokenLimit', msgs.length, tokenLimit);
		if (msgs.length > tokenLimit) {
			// console.log('-- ', msgs.length, tokenLimit, msgs.length - tokenLimit);
			cut = msgs.substring(msgs.length - tokenLimit, msgs.length);
			cut = cut.substring(cut.indexOf('@') - 17, 99999999);
			cut = systemContent + cut;
		}
		else {
			cut = systemContent + msgs;
		}

		try {
			const textoEntrada = cut + '\n Pergunta: ' + userContent ;
			const resposta = await model.generateContent(textoEntrada);
			if (resposta) {
				cttrlLogTokenSize.store({ ai:'openAI', size: tokenLimit });
				return resposta.response.text();
			}
			else {
				tokenLimit = tokenLimit - 2000;
			}

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
			tokenLimit = tokenLimit - 2000;
		}

	}

	return false;

};

module.exports = { perguntar };