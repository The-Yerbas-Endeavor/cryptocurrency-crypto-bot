'use strict';

require('dotenv').config();

const REQUIRED_ENV_VARS = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];

function requireEnvironment() {
  const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function loadConfig() {
  requireEnvironment();

  return Object.freeze({
    app: Object.freeze({
      environment: process.env.NODE_ENV || 'development',
      version: '2.0.0-alpha.1'
    }),
    discord: Object.freeze({
      token: process.env.DISCORD_TOKEN,
      clientId: process.env.DISCORD_CLIENT_ID,
      guildId: process.env.DISCORD_GUILD_ID || null,
      activity: process.env.DISCORD_ACTIVITY || 'Yerbas Tip Bot v2'
    }),
    yerbas: Object.freeze({
      symbol: 'YERB',
      explorerUrl: process.env.YERB_EXPLORER_URL || 'https://explorer.yerbas.org',
      rpcHost: process.env.YERB_RPC_HOST || '127.0.0.1',
      rpcPort: Number.parseInt(process.env.YERB_RPC_PORT || '19998', 10),
      rpcUser: process.env.YERB_RPC_USER || null,
      rpcPassword: process.env.YERB_RPC_PASSWORD || null
    })
  });
}

module.exports = { loadConfig };
