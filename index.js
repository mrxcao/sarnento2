if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const fs = require('node:fs');
const path = require('node:path');
// const react = require("./modules/react");
const token = process.env.TOKEN;
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag} `);
	console.log(c);
});

client.login(token);