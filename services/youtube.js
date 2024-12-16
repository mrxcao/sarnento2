const { google } = require('googleapis');
const youtube = google.youtube('v3');

const apiKey = 'SUA_API_KEY';

async function buscarVideos(query) {
  const res = await youtube.search.list({
    key: apiKey,
    part: 'snippet',
    q: query,
    maxResults: 1,
  });

  return res.data.items;
}

/*
buscarVideos('JavaScript tutorial')
  .then(videos => {
    videos.forEach(video => console.log(video.snippet.title));
  })
  .catch(err => console.error('Erro:', err));
  */

  /*
  const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = 'SEU_CLIENT_ID';
const CLIENT_SECRET = 'SEU_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost';
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// URL para obter o código de autorização
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

// Após autorizar, cole o código aqui:
const code = 'COLE_SEU_CODIGO_AQUI';

async function getLastVideoDates() {
  // Trocar o código pelo token de acesso
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube('v3');

  // Listar canais que você está inscrito
  const subscriptions = await youtube.subscriptions.list({
    auth: oauth2Client,
    part: 'snippet',
    mine: true,
    maxResults: 5, // ajuste conforme necessário
  });

  for (const item of subscriptions.data.items) {
    const channelId = item.snippet.resourceId.channelId;
    const channelTitle = item.snippet.title;

    // Obter o último vídeo postado por cada canal
    const videos = await youtube.search.list({
      auth: oauth2Client,
      part: 'snippet',
      channelId: channelId,
      order: 'date',
      maxResults: 1,
    });

    if (videos.data.items.length > 0) {
      const lastVideo = videos.data.items[0];
      console.log(`Canal: ${channelTitle}`);
      console.log(`Último vídeo: ${lastVideo.snippet.title}`);
      console.log(`Data de publicação: ${lastVideo.snippet.publishedAt}`);
      console.log('--------------------------');
    }
  }
}

getLastVideoDates().catch(console.error);
*/