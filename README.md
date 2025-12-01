
<p align="center">
  <img src="https://sarnento.app.br/img/favicon/favicon.png" width="50">
</p>

# Sarnento — Discord Bot + API + Tasks + Front


<p align="center">
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js"></a>
  <a href="https://discord.js.org"><img src="https://img.shields.io/badge/Discord.js-14-blue?logo=discord"></a>
  <a href="https://pm2.keymetrics.io/"><img src="https://img.shields.io/badge/PM2-ecosystem-orange?logo=pm2"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-5.0+-brightgreen?logo=mongodb"></a>
</p>

![PM2](https://img.shields.io/badge/PM2-ecosystem-orange?logo=pm2)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

Monorepo do **Sarnento** (v2.1.2) contendo:
- **back/** — Bot do Discord (Discord.js 14), REST API (Express), integrações (OpenAI, Gemini, Copilot, Telegram), MongoDB, JWT, Puppeteer.
- **front/** — Painel React (react-scripts) para administração/monitoramento.
- **tasks/** — Agendador de rotinas (node-schedule) para manutenção (IPCA, loterias, etc.).

> Mais informações: **https://www.sarnento.app.br**

---

## Principais recursos (back)
- Comandos **prefixados** e **slash** (deploy com `npm run publ`).
- Reações automáticas a mensagens.
- API REST para manutenção e configurações.
- Integração com **Telegram** (comandos/consultas) e **WhatsApp** (via gateway, quando configurado).
- Resposta a menções com IA (suporte a **ChatGPT**, **Gemini**, **Copilot**).
- Banco **MongoDB** e agendamentos com **node-schedule**.
- Utilidades de criptografia AES e autenticação (JWT).

### Comandos inclusos (amostra)
Total: 14 — exemplos: `ping`, `help`, `echo`, `dog`, `gif`, `poke`, `pokescore`, `megasena`, `ban`, `denunciar`, `info`, `chapeuSeletor`.

---

## Estrutura (resumo)
```
├─ README.md
├─ back/
│  ├─ DB/
│  │  └─ mongo/
│  ├─ atualizarPackages.bat
│  ├─ atuallizaPackages.sh
│  ├─ beep.bat
│  ├─ classes/
│  │  ├─ Bard.js
│  │  └─ Loaders.js
│  ├─ commands/
│  │  ├─ ban.js
│  │  ├─ chapeuSeletor.js
│  │  ├─ denunciar.js
│  │  ├─ dog.js
│  │  ├─ echo.js
│  │  ├─ gif.js
│  │  ├─ help.js
│  │  ├─ info.js
│  │  ├─ megasena.js
│  │  ├─ ping.js
│  │  ├─ poke.js
│  │  ├─ pokescore.js
│  │  ├─ teste.js
│  │  └─ user.js
│  ├─ commandsPrefix/
│  │  ├─ apagaTudo.js
│  │  ├─ avatar.js
│  │  ├─ fala.js
│  │  ├─ help.js
│  │  ├─ ping.js
│  │  ├─ poke.js
│  │  ├─ pokescore.js
│  │  └─ teste.js
│  ├─ config.json.exemple
│  ├─ deploy-commands.js
│  ├─ docs/
│  │  ├─ Insomnia_2023-04-15.json
│  │  ├─ guide.txt
│  │  ├─ react.drawio
│  │  └─ react.mongodb.js
│  ├─ ecosystem.config.js
│  ├─ index.js
│  ├─ jobs/
│  │  ├─ ecosystem.config.js
│  │  ├─ index.js
│  │  ├─ modules/
│  │  ├─ run.js
│  │  ├─ runAll.js
│  │  ├─ tasks/
│  │  ├─ tasks.js
│  │  └─ tests/
│  ├─ modules/
│  │  ├─ actions.js
│  │  ├─ beep.mp3
│  │  ├─ crypto.js
│  │  ├─ denunciar.js
│  │  ├─ isRevokedCallback.js
│  │  ├─ log.js
│  │  ├─ megasena.js
│  │  ├─ react.js
│  │  ├─ status.js
│  │  └─ tools.js
│  ├─ nodemon,json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public/
│  │  └─ img/
│  ├─ scripts/
│  │  ├─ commandsReader.js
│  │  └─ commandsReaderSlash.js
│  ├─ services/
│  │  ├─ axios.js
│  │  ├─ coingecko.js
│  │  ├─ copilot.js
│  │  ├─ gemini.js
│  │  ├─ openAI.js
│  │  ├─ pokeapi.js
│  │  ├─ telegram.js
│  │  └─ youtube.js
│  └─ srcAPI/
│     ├─ controllers/
│     ├─ indexAPI.js
│     ├─ init.js
│     ├─ middlewares/
│     ├─ public/
│     ├─ routes/
│     └─ server.js
├─ front/
│  ├─ LICENSE
│  ├─ README.md
│  ├─ _backup/
│  │  └─ siteAntigoEmVue.7z
│  ├─ deploy.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public/
│  │  ├─ css/
│  │  ├─ img/
│  │  ├─ index.html
│  │  ├─ js/
│  │  ├─ manifest.json
│  │  ├─ robots.txt
│  │  └─ vendor/
│  └─ src/
│     ├─ components/
│     ├─ index.js
│     ├─ private/
│     ├─ public/
│     ├─ reportWebVitals.js
│     ├─ routes.js
│     ├─ services/
│     └─ setupTests.js
└─ tasks/
   ├─ README.md
   ├─ docs/
   │  └─ queryes/
   ├─ index.js
   ├─ jest.config.js
   ├─ modules/
   │  ├─ DB/
   │  ├─ cleanner.js
   │  ├─ ipca.js
   │  ├─ loterias.js
   │  └─ tools.js
   ├─ package-lock.json
   ├─ package.json
   ├─ run.js
   ├─ runAll.js
   ├─ tasks/
   │  ├─ atualizarIPCA.js
   │  └─ megasena.js
   ├─ tasks.js
   └─ tests/
      └─ jest.test.js
```
> *Dica:* o **ecosystem.config.js** já traz 2 apps para o PM2: `sarnento2` (bot) e `sarnento_API` (API).

---

## Pré‑requisitos
- Node.js 18+
- MongoDB (local ou remoto)
- (Linux) libs para `@napi-rs/canvas`:
  ```bash
  sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  ```

---

## Instalação & execução

### 1) Backend (back/)
```bash
cd back
npm i
cp .env.exemple .env   # preencha as variáveis (abaixo)
cp config.json.exemple config.json
# (opcional) publicar slash commands
npm run publ
# rodar em dev ou prod
npm run dev    # nodemon
npm start      # node index.js
```

Scripts úteis:
- `dev` — inicia bot com **nodemon**
- `start` — inicia bot (node)
- `publ` — publica **slash commands** no Discord
- `test` — jest
- `beep` — utilitário

### 2) Frontend (front/)
```bash
cd front
npm i
npm start   # porta 3002 por padrão
npm run build && npm run deploy
```

### 3) Tasks (tasks/)
```bash
cd tasks
cp .env.exemple .env   # (se houver); configure variáveis usadas nas rotinas
npm i
npm start
```

---

## Variáveis de ambiente (back/.env.exemple)
```ini
APP_URL=localhost
NODE_ENV=development
DEBUG=true
AUTH_KEY=
JWT_SECRET=
JWT_EXPIRES=
AES_KEY=

TOKEN=
CLIENTID=
GUILDID=
DISCORD_PUBLIC_KEY=

PORT=3000

MONGO_LOCAL=mongodb://localhost:27017/
MONGO=

SQL_URL=
SQL_DB=
SQL_USR=
SQL_PSW=

CHATGPT_API_KEY=
GEMINI_API_KEY=

BARD_SECURE_1PSID=
BARD_SECURE_1PSIDTS=

LLAMA_TOKEN=

CL_API_URL=https://api.apilayer.com/currency_data/
CL_API_KEY=
POKEAPI_URL=https://pokeapi.co/api/v2/

OPENAI_API_ORG=
OPENAI_API_KEY=

COPILOT_API_KEY=
COPILOT_URL=https://api.copilot.com

TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
```
> **Obrigatórias principais:**
- **DISCORD**: `TOKEN`, `CLIENTID`, `GUILDID`, `DISCORD_PUBLIC_KEY`
- **MongoDB**: `MONGO_LOCAL` (ou sua URL remota)
- **API Keys** (opcionais conforme recurso): `OPENAI_API_KEY`, `OPENAI_API_ORG`, `COPILOT_API_KEY`, `GEMINI/GOOGLE` (se aplicável), `TELEGRAM_TOKEN`, etc.
- **Segurança**: `JWT_SECRET`, `JWT_EXPIRES`, `AES_KEY`

Arquivo **config.json**:
```json
{
    "prefix":"!", 
    "falaChannel":"int",
    
    "clientId": "",
    "guildId": ""
    
}
```
- `prefix`: prefixo de comandos (ex.: `!`)
- `falaChannel`: ID de canal para TTS/respostas
- `clientId`/`guildId`: IDs do Discord para publicação de comandos

---

## API (srcAPI/)
A API roda no mesmo projeto **back/**, em `srcAPI/`. Para iniciar via PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup    # habilitar resurrect no boot
```
Apps:
- `sarnento2` → `index.js` (bot)
- `sarnento_API` → `srcAPI/indexAPI.js` (API)

> Dica (Windows): certifique-se de executar **PM2** como administrador para que `pm2 startup` registre o serviço corretamente. No Linux, copie e execute o comando retornado por `pm2 startup` e depois rode `pm2 save`.

---

## Desenvolvimento
- **Padrões**: ESLint (Airbnb Base), Jest para testes.
- **Tecnologias** (back): discord.js, express, mongoose, jwt, axios, puppeteer, node-schedule, @napi-rs/canvas.
- **Tecnologias** (front): React, react-router, axios.
- **Tarefas** (tasks): node-schedule, mongoose, puppeteer, exceljs.

---

## Exemplos rápidos

### Checar vida do bot
```bash
pm2 status
pm2 logs sarnento2
```

### Publicar slash commands
```bash
cd back
npm run publ
```

### Exemplo de rota (conceito)
```bash
GET http://localhost:3000/health
# resposta esperada: { "status": "ok", "uptime": "..." }
```

---

## Deploy (PM2)
```bash
cd back
pm2 start ecosystem.config.js      # inicia bot + API
pm2 save                           # salva o estado para resurrect
pm2 startup                        # configura iniciar junto ao SO
```

---

## Licença
ISC © MrXcao
