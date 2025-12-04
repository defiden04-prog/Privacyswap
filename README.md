# Privacyswap (private swap , send , bridge on solana )
Private swap on solana
# Privacy Swap SDK 

This SDK provides programmatic access to Privacy Swap primitives. This repository is a TypeScript / Node.js SDK designed to work against devnet and mainnet.

Summary of this change
- Adds explicit devnet support via environment variables and a network selection flag.
- Adds example configuration and usage for devnet.
- Adds tests (unit + mocked integration) using Jest.

Quickstart (Devnet)
1. Clone
   git clone https://github.com/defiden04-prog/Privacyswap.git
   cd Privacyswap
2. Install
   npm ci
3. Configure environment
   - Copy the sample environment file:
     cp .env_sample .env
   - Edit .env and fill in DEVNET_RPC_URL and DEVNET_PRIVACY_SWAP_PROGRAM_ID and any token addresses you need to use on devnet.
4. Use the SDK (TypeScript example)

```ts
import { PrivacySwapClient } from './dist';
import dotenv from 'dotenv';
dotenv.config();

// network can be 'devnet' or 'mainnet'
const client = new PrivacySwapClient({
  network: process.env.PRIVACY_SWAP_NETWORK || 'devnet',
  rpcUrl: process.env.DEVNET_RPC_URL,
  programId: process.env.DEVNET_PRIVACY_SWAP_PROGRAM_ID,
});

async function run() {
  // Example: connect and check status
  await client.connect();
  console.log('Connected to', client.rpcUrl, 'program', client.programId);
}

run().catch(console.error);
```

5. Running tests
- Unit & mocked tests (no network calls): npm test
- If you opt into live devnet integration tests, set LIVE_DEVNET_TEST=true and provide a test wallet as described below (not recommended for public CI).

6. CI
- The repo includes a GitHub Actions workflow that runs the test suite.
- Keep live integration tests behind a secure flag and secrets.

Environment variables (.env)
- PRIVACY_SWAP_NETWORK: 'devnet' or 'mainnet' (default devnet)
- DEVNET_RPC_URL: RPC URL for devnet
- DEVNET_PRIVACY_SWAP_PROGRAM_ID: Program ID / contract address on devnet
- MAINNET_RPC_URL: RPC URL for mainnet
- MAINNET_PRIVACY_SWAP_PROGRAM_ID: Program ID / contract address on mainnet
- LIVE_DEVNET_TEST: set to 'true' to run live devnet tests (CI: use secrets)
- TEST_WALLET_PRIVATE_KEY: (optional) for live test runs only — store securely and never commit

Security
- Never commit real private keys to the repo.
- For live test wallets, store private keys / mnemonics in CI secrets and do not share them.

Contributing
- Branch: feature/devnet-integration contains the initial devnet support, tests, and CI workflow.
- # Privacy Swap SDK (Devnet integration guide)

This SDK provides programmatic access to Privacy Swap primitives. This repository is a TypeScript / Node.js SDK designed to work against devnet and mainnet.

Summary
- Adds explicit devnet support via environment variables and a network selection flag.
- Includes example configuration and usage for devnet.
- Includes a basic Jest test suite (unit + mocked) and a CI workflow.

Quickstart (Devnet)
1. Clone
   git clone https://github.com/defiden04-prog/Privacyswap.git
   cd Privacyswap

2. Install
   npm ci

3. Configure environment
   - Copy the sample environment file:
     cp .env_sample .env
   - Edit .env and fill in DEVNET_RPC_URL and DEVNET_PRIVACY_SWAP_PROGRAM_ID and any token addresses you need to use on devnet.

4. Use the SDK (TypeScript example)
```ts
import { PrivacySwapClient } from './dist';
import dotenv from 'dotenv';
dotenv.config();

// network can be 'devnet' or 'mainnet'
const client = new PrivacySwapClient({
  network: process.env.PRIVACY_SWAP_NETWORK || 'devnet',
  rpcUrl: process.env.DEVNET_RPC_URL,
  programId: process.env.DEVNET_PRIVACY_SWAP_PROGRAM_ID,
});

async function run() {
  // Example: connect and check status
  await client.connect();
  console.log('Connected to', client.rpcUrl, 'program', client.programId);
}

run().catch(console.error);

````markdown name=README.md url=https://github.com/defiden04-prog/Privacyswap/blob/main/README.md
```markdown
# Privacy Swap SDK

Comprehensive TypeScript SDK for interacting with the Privacy Swap program on devnet and mainnet.

- Repository: https://github.com/defiden04-prog/Privacyswap
- Language: TypeScript / Node.js
- Purpose: Provide a simple client that can be used to integrate Privacy Swap functionality into applications, with easy toggling between devnet and mainnet.

Table of contents
- Overview
- Features
- Quickstart
  - Requirements
  - Install
  - Configuration
  - Example usage
- API reference
  - PrivacySwapClient
    - constructor options
    - methods: connect, info, (placeholders)
- Environment variables
- Testing
  - Unit (mocked)
  - Live devnet tests (opt-in)
- CI
- Development & Contributing
- Security & Secrets
- Troubleshooting
- Roadmap
- License

Overview
--------
Privacy Swap is a privacy-preserving swap primitive. This SDK is a minimal, extensible TypeScript client intended to:
- Provide environment-driven configuration (devnet/mainnet).
- Offer a small, well-tested core to bootstrap app integrations.
- Be easy to extend with blockchain-specific logic (e.g., Solana, Ethereum) by swapping in a provider implementation.

This repository includes:
- src/: TypeScript source code for the client
- __tests__/: Jest tests (unit & mocked)
- .github/workflows/ci.yml: CI workflow for running tests
- .env_sample: Example environment file for devnet and mainnet
- README.md: This document

Features
--------
- Environment-driven network selection (PRIVACY_SWAP_NETWORK)
- Simple client class (PrivacySwapClient) exposing initialization and helper methods
- Clear separation of configuration and runtime options
- Unit tests that validate configuration logic without requiring network access
- CI workflow example for automated runs

Quickstart
----------
Requirements
- Node.js 18+
- npm or yarn
- A devnet RPC URL and Privacy Swap program ID for integration tests (optional)

Install
1. Clone the repo:
```bash
git clone https://github.com/defiden04-prog/Privacyswap.git
cd Privacyswap

# Privacy Swap & Zcash ↔ Solana Bridge (MVP)

This repository contains an MVP bridge that lets users "wrap" Zcash (ZEC) into an SPL token on Solana (wZEC) and redeem it the other direction via a trusted relayer.

Important notes
- This is a minimal trusted-relayer design: the relayer is the mint authority of the wZEC SPL token and mints/burns tokens when it observes the corresponding Zcash or Solana locks/burns.
- For Zcash → Solana, the user must send ZEC to a configured "burn address" and include the destination Solana pubkey in an OP_RETURN (nulldata) output. This is NOT shielded — it is an MVP trade-off to complete the integration.
- For Solana → Zcash, the user burns wZEC on Solana or submits a signed withdrawal request; the relayer then sends ZEC on Zcash to the requested address.
- Do not use this on mainnet until you perform thorough security and legal review and add decentralized relayers / dispute resolution / on-chain proofs.

Repository contents
- relayer/: Off-chain relayer that watches Zcash, mints on Solana, and processes withdrawals.
- solana-client/: Minimal TypeScript helpers for interacting with the wZEC mint and for burning tokens (users).
- .env_sample: environment configuration example
- README.md: this document

Design / Flows
1) Mint (Zcash → Solana)
- User crafts a Zcash testnet transaction that sends N ZEC to BURN_ADDRESS and includes an OP_RETURN output with the recipient Solana pubkey (UTF-8).
- Relayer polls Zcash RPC, detects the burn Tx, parses the recipient pubkey and amount, and mints the equivalent wZEC to recipient's associated SPL token account.

2) Redeem (Solana → Zcash)
- User burns wZEC on Solana (or calls an off-chain API which will perform the burn for them) and includes the recipient Zcash address (transparent or shielded) in the memo or a signed withdrawal request.
- Relayer monitors Solana burns / receives the withdrawal request, and sends ZEC via Zcash RPC to recipient.

Security & Operational Notes
- Private keys: the relayer requires:
  - Zcash RPC credentials (user/password or an RPC endpoint)
  - Relayer Solana keypair (mint authority keypair) — keep this safe; rotate if compromised.
- Use environment variables and CI secrets — never commit keys into the repo.
- Consider multi-sig for mint authority, or a PDA-based mint authority requiring multiple off-chain signers, for higher security.

Prerequisites
- Node.js 18+
- npm or yarn
- Solana CLI / connection (devnet recommended)
- Zcash testnet RPC endpoint (run zcashd testnet or use a provider)

Getting started (local / devnet)
1. Clone & install
```bash
git clone <your-repo>
cd <your-repo>
# We'll run relayer and solana client separately
