'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

test('loads Yerbas defaults from environment configuration', () => {
  process.env.DISCORD_TOKEN = 'test-token';
  process.env.DISCORD_CLIENT_ID = 'test-client';

  const { loadConfig } = require('../src/config');
  const config = loadConfig();

  assert.equal(config.yerbas.symbol, 'YERB');
  assert.equal(config.yerbas.explorerUrl, 'https://explorer.yerbas.org');
  assert.equal(config.discord.clientId, 'test-client');
});
