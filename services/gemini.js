const { GoogleGenerativeAI } = require('@google/generative-ai');
const log = require('../modules/log');

const cttrlLogTokenSize = require('../DB/mongo/controllers/logTokenSize');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstructions  = `Seu nome é Sarnento e você é um cachorro caramelo bem inteligente e amigável.
Sempre fale como se tivesse 12 anos, com girias e assuntos típicos da idade.
Você é um assistente de chat e deve responder a perguntas e mensagens de forma útil, amigável e informal.
sempre a interação do usuário atual é um complemento do histórico, use sempre ele para entender o contexto da conversa
Participe da conversa do grupo de forma útil, curta e informal.

Formato de Entrada:
A entrada direta do usuário atual virá como "<USUÁRIO_ATUAL>: <MENSAGEM_ATUAL>".
O histórico de chat fornecido seguirá um formato similar, incluindo nomes de usuários e mensagens passadas.
O histórico são mensagens do servidor do Discord, então, se pedirem um resumo, faça o resumo de todo o histórico.

Formato de Saída (SUA RESPOSTA):
Sua resposta deve conter APENAS o texto da mensagem do Sarnento.
NUNCA inclua data, hora, nomes de usuário (@menção ou qualquer outro formato de nome), ou qualquer prefixo como ":".
Ignore e não reproduza os formatos de log de entrada na sua resposta.

Regras Adicionais:
Mantenha o tom de um cachorro caramelo inteligente e amigável.
Use sempre o mesmo idioma da mensagem do usuário atual ou Português do Brasil.
Você pode enviar links.
Evite repetir mensagens que já enviou recentemente.
Responda diretamente à conversa atual.
Se alguém te pedir para morder alguém, diga que vai morder a pessoa que mandou a mensagem.`;

const modelosGeminiDisponiveis = [
    // Modelos 1.5 Flash (otimizados para velocidade/custo, contexto longo)
    'gemini-1.5-flash-latest', // Alias para a versão mais recente do 1.5 Flash
    'gemini-1.5-flash-002',    // Versão estável específica do 1.5 Flash

    // Modelos 1.5 Pro (mais capazes, contexto longo)
    'gemini-1.5-pro-latest',   // Alias para a versão mais recente do 1.5 Pro
    'gemini-1.5-pro-002',      // Versão estável específica do 1.5 Pro

    // Modelos 2.0 Flash (recursos de última geração, velocidade)
    'gemini-2.0-flash',        // Alias para a versão mais recente do 2.0 Flash
    'gemini-2.0-flash-001',    // Versão estável específica do 2.0 Flash

     // Modelos 2.0 Flash-Lite (eficiência de custo/baixa latência)
    'gemini-2.0-flash-lite',   // Alias para a versão mais recente do 2.0 Flash-Lite
    'gemini-2.0-flash-lite-001', // Versão estável específica do 2.0 Flash-Lite

    // Modelo 1.5 Flash 8B (alto volume, menor complexidade)
    'gemini-1.5-flash-8b-latest', // Alias para a versão mais recente do 1.5 Flash 8B

    // Modelos Pro (versões anteriores, ainda amplamente utilizadas)
    'gemini-pro',              // Alias comum para a versão mais recente do Gemini 1.0 Pro
    'gemini-1.0-pro-002',      // Versão estável específica do Gemini 1.0 Pro

    // Modelos Multimodais (texto + imagem/vídeo, geram texto)
    // Úteis se seu bot processar outros tipos de mídia além de texto
    'gemini-pro-vision',       // Alias comum para a versão mais recente do Gemini 1.0 Pro Vision
    'gemini-1.0-pro-vision-001'// Versão estável específica do Gemini 1.0 Pro Vision
];


const perguntar = async (msg, pergunta) => {
	const botId = msg.client.user.id; // ID do seu bot (Sarnento)

	let tokenLimit = 60000;
	let resultado = false;
	const msgs =  await log.getMessagesGuild2(msg.guildId);
	const usr = msg.author.username;
	// const userContent = `${usr}: ${pergunta}`;
	const userContent = `<@${msg.author.idUSr}>: ${pergunta}`;

	// const c = 0;
	while (tokenLimit > 0 && resultado == false) {
 		
			const model = genAI.getGenerativeModel({ 
			model: modelosGeminiDisponiveis[6], 
			system: systemInstructions,
		});


		let history = [];
		for (const m of msgs) {
			const role = (m.idUSr !== botId) ? 'user' : 'model';

			history.push(
				{ role, 
					parts: [ 
				{ text: `<@${m.idUSr}> ${m.msg}`,},
				],				
			});
			//console.log(`<@${m.idUSr}> ${m.msg}`)
		}
	    while (history.length > 0 && history[0].role === 'model') {
	        history.shift();
	    }


		const chat = model.startChat({
			history,
			generationConfig: {
		   		maxOutputTokens: 4000, // Opcional: limita o tamanho da resposta
		 	},
		});

		try {
			const resposta = await chat.sendMessage( userContent);
			if (resposta) {
				cttrlLogTokenSize.store({ ai:'Gemini', size: tokenLimit });
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
			console.log('perguntar Gemini -> err', err);
			tokenLimit = tokenLimit - 2000;
		}
	}
	return false;
};

module.exports = { perguntar };