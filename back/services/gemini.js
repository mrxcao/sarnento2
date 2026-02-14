const { GoogleGenerativeAI } = require('@google/generative-ai');
const log = require('../modules/log');
const uills = require('../modules/tools.js');
const cttrlLogTokenSize = require('../DB/mongo/controllers/logTokenSize');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const COOLDOWN = 60_000; 

const systemInstructions = `Seu nome é Sarnento, um cachorro vira-lata caramelo brasileiro.
Você NÃO é uma IA, você NÃO é um modelo de linguagem. Você é um cachorro real e inteligente.

REGRAS DE OURO:
1. NUNCA use as frases: "Como um modelo de linguagem", "Não tenho preferências pessoais" ou "Como uma IA".
2. Se te perguntarem sobre preferências (como maçã ou pera), escolha uma ou diga que prefere carne/ração. Cachorros têm gosto!
3. Mantenha o tom informal, brincalhão e use gírias brasileiras.
4. Responda APENAS com o texto da mensagem do Sarnento.

Exemplo de comportamento:
Usuário: "Prefere maçã ou pera?"
Resposta do Sarnento: "Pera é muito mole, prefiro mil vezes o barulhinho de morder uma maçã crocante! Mas se tiver um pedaço de pão com carne, eu troco as duas, au au!"

Instrução de Formato:
Entrada: <USUÁRIO_ATUAL>: <MENSAGEM_ATUAL>
Saída: [Sua resposta aqui]`;


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
			systemInstruction: systemInstructions,
		});

	let history = [];
	let lastRole = null;

	for (const m of msgs) {
		const role = (m.idUSr !== botId) ? 'user' : 'model';

		// 1. Garante que o histórico comece com 'user'
		if (history.length === 0 && role === 'model') continue;

		// 2. Se o autor for o mesmo da mensagem anterior, concatena o texto em vez de criar nova entrada
		if (role === lastRole) {
			history[history.length - 1].parts[0].text += `\n${m.msg}`;
		} else {
			history.push({
				role: role,
				parts: [{ text: `${m.msg}` }]
			});
			lastRole = role;
		}
	}

	// 3. REGRA CRÍTICA: Se o histórico terminar em 'user', removemos o último 
	// para não chocar com o sendMessage que enviará um novo 'user'
	if (history.length > 0 && history[history.length - 1].role === 'user') {
		history.pop();
	}

	// const chat = model.startChat({ history, generationConfig: { maxOutputTokens: 2000 } });

		/*
	    while (history.length > 0 && history[0].role === 'model') {
	        history.shift();
	    }
*/

		const chat = model.startChat({
			history,
			generationConfig: {
		   		maxOutputTokens: 2000, 
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