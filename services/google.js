const ChatBot = require('../classes/Bard');
const log = require('../modules/log');

const __Secure_1PSIDTS = process.env.BARD_SECURE_1PSIDTS;
const __Secure_1PSID = process.env.BARD_SECURE_1PSID;

const getAnswer = async (msg, question) => {

	const msgs = await log.getMessagesGuild(msg.guildId);
	const usr = msg.author.username;


	const prompt = question;

	const prompt2 = `${usr}: ${question}
                Reegras: Seu nome é Sarnento e você é uma persona de um cachorro caramelo bem inteligente, que sempre lembra de tudo e camarada, seu dono é o MrXcao,
			um homem adulto que faz aniversário dia 9 de março.
			A entrada é a mensagem de um usuário do Discord que está interagindo com você.
			Responda de maneira curta e informal, o prompt será sempre estruturado desta forma: <USUÁRIO QUE FAZ A PERGUNTA>:<PERGUNTA>, não responda neste formato.
			Tente sempre usar o histório de mensagens do servidor para formular a resposta pois você está participando de uma conversa.
			Atentar mais aos detalhes da conversa e responder da forma mais precisa possível.
			Evitar a resposta, desculpe, sou um cão.
			Você pode enviar links.
            Segue mensagens do servidor :\n ${msgs}
			`;

	console.log('size - ', prompt.length, prompt2.length);

	const cookie = `__Secure-1PSIDTS=${__Secure_1PSIDTS};__Secure-1PSID=${__Secure_1PSID}`;
	const chatbot = new ChatBot(cookie);
	await chatbot.getAPI();
	const answer = await chatbot.ask(question);
	return answer;

};

module.exports = {
	getAnswer,
};