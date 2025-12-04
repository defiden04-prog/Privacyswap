# Privacyswap
Private swap on solana
# Privacy Swap SDK (Devnet integration guide)

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
