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


const modelosGeminiDisponiveis =  [
  'models/gemini-2.5-flash',
  'models/gemini-2.5-pro',
  'models/gemini-2.0-flash',
  'models/gemini-2.0-flash-001',
  'models/gemini-2.0-flash-exp-image-generation',
  'models/gemini-2.0-flash-lite-001',
  'models/gemini-2.0-flash-lite',
  'models/gemini-2.5-flash-preview-tts',
  'models/gemini-2.5-pro-preview-tts',
  'models/gemma-3-1b-it',
  'models/gemma-3-4b-it',
  'models/gemma-3-12b-it',
  'models/gemma-3-27b-it',
  'models/gemma-3n-e4b-it',
  'models/gemma-3n-e2b-it',
  'models/gemini-flash-latest',
  'models/gemini-flash-lite-latest',
  'models/gemini-pro-latest',
  'models/gemini-2.5-flash-lite',
  'models/gemini-2.5-flash-image',
  'models/gemini-2.5-flash-lite-preview-09-2025',
  'models/gemini-3-pro-preview',
  'models/gemini-3-flash-preview',
  'models/gemini-3.1-pro-preview',
  'models/gemini-3.1-pro-preview-customtools',
  'models/gemini-3-pro-image-preview',
  'models/nano-banana-pro-preview',
  'models/gemini-robotics-er-1.5-preview',
  'models/gemini-2.5-computer-use-preview-10-2025',
  'models/deep-research-pro-preview-12-2025',
  'models/gemini-embedding-001',
  'models/aqa',
  'models/imagen-4.0-generate-001',
  'models/imagen-4.0-ultra-generate-001',
  'models/imagen-4.0-fast-generate-001',
  'models/veo-2.0-generate-001',
  'models/veo-3.0-generate-001',
  'models/veo-3.0-fast-generate-001',
  'models/veo-3.1-generate-preview',
  'models/veo-3.1-fast-generate-preview',
  'models/gemini-2.5-flash-native-audio-latest',
  'models/gemini-2.5-flash-native-audio-preview-09-2025',
  'models/gemini-2.5-flash-native-audio-preview-12-2025'
];

async function listModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${genAI.apiKey}`);
  const data = await response.json();
  return data
  //console.log(JSON.stringify(data, null, 2));
}


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
			model: modelosGeminiDisponiveis[0], 
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
			console.log(':: error',error);
			const lista = await listModels()
			const models = lista.models.map(m => m.name);
			console.log(':: modelos disponíveis', models);
			console.log(':: perguntar Gemini -> err', error.status, 'tokenLimit',tokenLimit);
			await uills.sleep(COOLDOWN);
			tokenLimit = tokenLimit - 2000;
		}
	}
	return false;
};

module.exports = { perguntar };