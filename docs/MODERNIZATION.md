# Yerbas Tip Bot v2 modernization plan

This document defines the staged migration from the legacy Cryptocurrency Crypto Bot to the official Yerbas Tip Bot v2.

## Non-negotiable safety rules

- Never alter production balance data without a tested migration and backup.
- Never use JavaScript floating-point arithmetic for YERB accounting.
- Never credit the same on-chain transaction more than once.
- Never commit Discord, database, or Yerbas Core credentials.
- Never broadcast a withdrawal before the matching database reservation is committed.
- Keep `master` stable while v2 work proceeds on `modernize-v2`.

## Phase 0: inventory and reproducibility

- Record the supported Yerbas Core version and RPC behavior.
- Document the current MySQL schema, indexes, and balance units.
- Produce anonymized fixtures for users, deposits, withdrawals, payments, rain, drops, and staking.
- Add a reproducible legacy installation test.
- Back up the live database and wallet before any deployment test.

## Phase 1: project foundation

- Target Node.js 22 LTS.
- Add `.env.example` and validated environment configuration.
- Add ESLint, formatting, unit tests, and GitHub Actions.
- Add structured logging with credential redaction.
- Add graceful startup, shutdown, and health checks.
- Remove obsolete native Discord voice dependencies that are not required by a tip bot.

## Phase 2: Discord.js v14

- Configure explicit gateway intents.
- Replace the legacy `message` event with supported Discord.js v14 events.
- Introduce slash commands and command registration.
- Preserve selected prefix commands during a documented transition period.
- Replace legacy embeds, roles, reactions, collectors, presence, and cache access.
- Add Discord permission checks for every administrative command.

## Phase 3: exact accounting

- Represent one YERB as 100,000,000 atomic units.
- Convert all stored and calculated monetary values to integer atomic units or exact decimal values at database boundaries.
- Wrap tips, rain, drops, staking transfers, deposits, and withdrawals in SQL transactions.
- Lock affected balance rows during transfers.
- Add immutable accounting journal entries and reconciliation tools.
- Add database constraints preventing negative balances and duplicate transaction credits.

## Phase 4: Yerbas Core adapter

- Implement a dedicated RPC client with authentication, timeouts, retries, and error classification.
- Validate destination addresses before accepting withdrawals.
- Verify wallet, network, and chain identity during startup.
- Add idempotent deposit discovery and confirmation tracking.
- Add withdrawal reservation, broadcast, failure, and confirmation states.
- Reconcile internal liabilities against the hot-wallet balance.

## Phase 5: migration and deployment

- Build an automatic schema migration system.
- Perform dry-run migration reports before changing data.
- Test restart recovery at every transaction state.
- Add Docker and systemd deployment examples.
- Document wallet firewalling, encrypted backups, hot-wallet limits, and emergency shutdown.
- Run a testnet or isolated-wallet acceptance cycle before mainnet release.

## Phase 6: Yerbas community features

After the custody and accounting foundation is production-ready, consider:

- Faucet campaigns with abuse controls.
- Scheduled and sponsored rain events.
- Yerbas Asset tipping and giveaways.
- Explorer links and transaction-status embeds.
- Community reward roles.
- Prediction-market integrations that use separately reviewed custody and settlement logic.

## Production release gate

Version 2.0.0 must not be declared production-ready until all of the following pass:

- Deposit detection and confirmation tests.
- Duplicate deposit and reorg handling tests.
- Concurrent tip and withdrawal tests.
- Insufficient-funds and row-lock tests.
- Withdrawal failure and restart-recovery tests.
- Database migration and rollback tests.
- Internal-liability versus wallet-balance reconciliation.
- Secret scanning and dependency review.
- A controlled mainnet canary deployment with limited funds.
