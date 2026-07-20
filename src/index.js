'use strict';

const {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits
} = require('discord.js');
const { loadConfig } = require('./config');

async function start() {
  const config = loadConfig();
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ]
  });

  client.once(Events.ClientReady, (readyClient) => {
    readyClient.user.setPresence({
      activities: [{ name: config.discord.activity, type: ActivityType.Watching }],
      status: 'online'
    });

    console.log(`Yerbas Tip Bot v2 ${config.app.version} connected as ${readyClient.user.tag}`);
  });

  client.on(Events.Error, (error) => {
    console.error('Discord client error:', error);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
  });

  process.on('SIGTERM', () => client.destroy());
  process.on('SIGINT', () => client.destroy());

  await client.login(config.discord.token);
}

start().catch((error) => {
  console.error(`Unable to start Yerbas Tip Bot v2: ${error.message}`);
  process.exitCode = 1;
});
