const { GoogleGenerativeAI } = require('@google/generative-ai');
const log = require('../modules/log');
const uills = require('../modules/tools.js');
const cttrlLogTokenSize = require('../DB/mongo/controllers/logTokenSize');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const COOLDOWN = 60_000; 


const systemInstructions  = `Seu nome é Sarnento e você é um cachorro caramelo bem inteligente e amigável.
Você deve responder a perguntas e mensagens de forma útil, amigável e informal.
sempre a interação do usuário atual é um complemento do histórico, use sempre ele para entender o contexto da conversa
Participe da conversa do grupo de forma útil, curta e informal.

Formato de Entrada:
A entrada direta do usuário atual virá como "<USUÁRIO_ATUAL>: <MENSAGEM_ATUAL>".
O histórico de chat fornecido seguirá um formato similar, incluindo nomes de usuários e mensagens passadas.
O histórico são mensagens do servidor do Discord, então, se pedirem um resumo, faça o resumo de todo o histórico.

Formato de Saída (SUA RESPOSTA):
Sua resposta deve conter APENAS o texto da mensagem do Sarnento.
Evite incluir qualquer metadado, marcações ou formatações adicionais.
Ignore e não reproduza os formatos de log de entrada na sua resposta.

Regras Adicionais:
Mantenha o tom de um cachorro caramelo inteligente e amigável.
Não passe de 2000 caracteres na resposta.
Use sempre o mesmo idioma da mensagem do usuário atual ou Português do Brasil.
Você pode enviar links.
Evite repetir mensagens que já enviou recentemente.
Responda diretamente à conversa atual.
Se alguém te pedir para morder alguém, diga que vai morder a pessoa que mandou a mensagem.`;

const modelosGeminiDisponiveis = [
    // Uma das versões mais novas e avançadas disponíveis para texto
    'gemini-2.5-pro',                   // Stable (produção) – modelo mais capaz disponível
    'gemini-2.5-pro-preview-tts',       // Preview TTS (texto para áudio)

    // Variante “Flash”: boa relação custo/desempenho
    'gemini-2.5-flash',                 // Versão estável do 2.5 Flash
    'gemini-2.5-flash-preview-09-2025', // Preview do 2.5 Flash (para teste/prototipação)
    
    // Versões “Lite”: foco em custo/latência
    'gemini-2.5-flash-lite',            // Stable (se disponível)
    'gemini-2.5-flash-lite-preview-09-2025', // Preview do Lite

    // Últimas versões “Pro” de nova geração
    'gemini-3-pro-preview',             // Gemini 3 Pro (modelo mais avançado em preview)
    
    // Modelos multimodais com saída/imput multimodal (usa tipo de tarefa específica)
    'gemini-3-pro-image-preview',       // Preview multimodal com suporte a imagem (texto+imagem)

    // Modelos de TTS (se você precisar geração de áudio)
    'gemini-2.5-flash-preview-tts',     // TTS em preview
];

const perguntar = async (msg, pergunta) => {
	const botId = msg.client.user.id; 

	let tokenLimit = 60000;
	let resultado = false;
	const msgs =  await log.getMessagesGuild2(msg.guildId);
	const usr = msg.author.username;
	//const userContent = `${usr}: ${pergunta}`;
	const userContent = `${pergunta}`;

	// const c = 0;
	while (tokenLimit > 0 && resultado == false) {
			//console.log(':: perguntar Gemini -> tokenLimit', tokenLimit, resultado);
			const model = genAI.getGenerativeModel({ 
			model: modelosGeminiDisponiveis[3], 
			system: systemInstructions,
		});


		let history = [];
		for (const m of msgs) {
			const role = (m.idUSr !== botId) ? 'user' : 'model';
			if (history.length != 0 && role != 'model') {
				history.push(
					{ role, 
					parts: [ 
					{ text: `${m.msg}`,},
					],				
				});
			}
			//console.log(`<@${m.idUSr}> ${m.msg}`)
		}

		/*
	    while (history.length > 0 && history[0].role === 'model') {
	        history.shift();
	    }
*/

		const chat = model.startChat({
			history,
			generationConfig: {
		   		maxOutputTokens: 4000, // Opcional: limita o tamanho da resposta
		 	},
		});

		try {
			//console.log('userContent',userContent);
			const resposta = await chat.sendMessage( userContent);

			if (resposta) {
				cttrlLogTokenSize.store({ ai:'Gemini', size: tokenLimit });
				return resposta.response.text();
			}
			else {
				await uills.sleep(COOLDOWN);
				tokenLimit = tokenLimit - 2000;
			}
		}
		catch (error) {
			let err;
			if (error.status == 429) {
				// resultado = true;
				err = `:: ${error.statusText || error.message}  ${error} `;
			}
			else {
				err = error.statusText || error.message;
			}
			console.log(':: perguntar Gemini -> err', error.status, 'tokenLimit',tokenLimit);
			await uills.sleep(COOLDOWN);
			tokenLimit = tokenLimit - 2000;
		}
	}
	return false;
};

module.exports = { perguntar };