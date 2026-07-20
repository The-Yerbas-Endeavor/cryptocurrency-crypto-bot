# Yerbas Tip Bot v2

The official Discord wallet and community tipping bot for the **Yerbas (YERB)** network.

> [!IMPORTANT]
> The `modernize-v2` branch is an active pre-release modernization branch. It is not yet recommended for production custody of funds. The legacy implementation is being upgraded in controlled stages so existing balances, deposits, withdrawals, tips, rain, drops, and staking records remain safe.

## Project status

- **Product name:** Yerbas Tip Bot
- **Development version:** 2.0.0-alpha
- **Network:** Yerbas mainnet
- **Ticker:** YERB
- **Explorer:** https://explorer.yerbas.org
- **Runtime target:** Node.js 22 LTS
- **Discord target:** Discord.js v14
- **Database:** MySQL/MariaDB
- **Wallet interface:** Yerbas Core JSON-RPC

The original v1 code remains available for reference. Modernization work takes place on `modernize-v2` and will be merged only after wallet accounting and migration tests pass.

## Planned v2 commands

Yerbas Tip Bot v2 will support modern Discord slash commands while retaining selected prefix commands during migration.

| Slash command | Legacy alias | Purpose |
|---|---|---|
| `/balance` | `+balance` | Display available YERB balance |
| `/deposit` | `+deposit` | Get a Yerbas deposit address |
| `/withdraw` | `+withdraw` | Withdraw YERB to an external address |
| `/tip` | `+tip` | Tip another Discord member |
| `/rain` | `+rain` | Distribute YERB among eligible members |
| `/drop` | `+drop` | Create a phrase or reaction giveaway |
| `/history` | `+history` | Review deposits, withdrawals, and payments |
| `/profile` | `+profile` | Display account information |

Administrative deposit-crediting and maintenance commands will be restricted by Discord permissions and recorded in an audit log.

## Modernization priorities

1. Upgrade the Discord integration to Discord.js v14.
2. Move credentials and secrets out of `config.js`.
3. replace callback-heavy code with structured async services.
4. Store YERB amounts as integer atomic units for exact accounting.
5. Add SQL transactions, row locking, idempotency, and audit records.
6. Validate all addresses and withdrawals through Yerbas Core RPC.
7. Add automated tests, GitHub Actions, Docker support, and migration tooling.

See [`docs/MODERNIZATION.md`](docs/MODERNIZATION.md) for the staged implementation plan.

## Yerbas Core RPC

The v2 wallet adapter will be tested against the RPC methods used by current Yerbas Core releases, including:

```text
getnewaddress
validateaddress
gettransaction
listtransactions
sendtoaddress
getwalletinfo
getblockchaininfo
getnetworkinfo
```

RPC credentials must never be committed to the repository. The production wallet should use a dedicated RPC account, local firewall restrictions, wallet encryption, backups, withdrawal limits, and a minimal hot-wallet balance.

## Security warning

This software manages cryptocurrency balances. Do not deploy the modernization branch with real funds until the applicable release is marked production-ready and the database migration, deposit-crediting, withdrawal, restart-recovery, and duplicate-processing tests have passed.

Report security issues privately to The Yerbas Endeavor rather than opening a public issue containing credentials or exploitable details.

## License and attribution

Yerbas Tip Bot v2 continues under the MIT License. It is based on the original open-source Cryptocurrency Crypto Bot by Christian Grieger and preserves attribution to the original author and contributors.
