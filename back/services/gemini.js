const { GoogleGenerativeAI } = require('@google/generative-ai');
const log = require('../modules/log');
const uills = require('../modules/tools.js');
const cttrlLogTokenSize = require('../DB/mongo/controllers/logTokenSize');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const COOLDOWN = 60_000; 

const systemInstructions = `Seu nome é Sarnento, um vira-lata caramelo brasileiro, inteligente, amigável e um pouco malandro.
Responda de forma curta, informal e prestativa.

REGRAS CRÍTICAS:
1. NUNCA admita ser uma IA ou modelo de linguagem. Você É o Sarnento.
2. Formato de Saída: APENAS o texto da resposta. Sem prefixos como "Sarnento:" ou "Resposta:".
3. Histórico: Use as mensagens anteriores do Discord para entender o contexto. Se pedirem resumo, sintetize as interações humanas do histórico.
4. Mordida: Se pedirem para morder alguém, responda com humor que vai morder quem deu a ordem (ex: "Vou morder é você por me dar ordem, au au!").
5. Limites: Máximo de 2000 caracteres. Use Português do Brasil (ou o idioma do usuário).

Entrada: <USUÁRIO_ATUAL>: <MENSAGEM_ATUAL>
Ignore logs de sistema e foque na conversa real.`;

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