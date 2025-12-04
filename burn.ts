/**
 * Example user-side script to burn wZEC tokens on Solana.
 * 
 * Usage:
 *  - Create a .env for this client (see .env_sample)
 *  - User must have an associated token account with wZEC and have tokens
 *  - The script burns tokens from the user's token account and logs a "withdrawal request".
 * 
 * Note: In production, you might send a signed withdrawal request to the relayer API so it can verify
 * the burn and send ZEC on Zcash. This script only demonstrates the on-chain burn.
 */
import dotenv from 'dotenv';
dotenv.config();
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createBurnInstruction } from '@solana/spl-token';
import bs58 from 'bs58';

const SOLANA_CLUSTER = process.env.SOLANA_CLUSTER || 'https://api.devnet.solana.com';
const WZEC_MINT = new PublicKey(process.env.WZEC_MINT!);

// Load user keypair JSON array in env USER_SOL_SECRET_JSON or base58 string
function loadKeypairFromEnv(envName: string): Keypair {
  const json = process.env[envName];
  if (!json) throw new Error(`${envName} required`);
  try {
    const arr = JSON.parse(json);
    const u8 = Uint8Array.from(arr);
    return Keypair.fromSecretKey(u8);
  } catch {
    try {
      const u8 = bs58.decode(json);
      return Keypair.fromSecretKey(u8);
    } catch (e) {
      throw new Error(`${envName} parse failed`);
    }
  }
}

async function main() {
  const connection = new Connection(SOLANA_CLUSTER, 'confirmed');
  const user = loadKeypairFromEnv('USER_SOL_SECRET_JSON');
  const recipientZcash = process.env.WITHDRAW_TO_ZCASH!;
  const amount = parseFloat(process.env.WITHDRAW_AMOUNT || '0.001'); // ZEC amount

  // Convert amount to token atomic units (assume 8 decimals)
  const atomic = Math.round(amount * 1e8);

  // get associated token account for user
  const ata = await getOrCreateAssociatedTokenAccount(connection, user, WZEC_MINT, user.publicKey);

  // create burn instruction
  const burnIx = createBurnInstruction(
    ata.address,
    WZEC_MINT,
    user.publicKey,
    atomic,
    [], // signers
  );

  // NOTE: For a real withdraw flow, include the recipientZcash value in a separate off-chain request
  const tx = new Transaction().add(burnIx);

  const sig = await sendAndConfirmTransaction(connection, tx, [user], { commitment: 'confirmed' });
  console.log('Burned tokens, signature', sig);
  console.log('Now notify relayer to send ZEC to', recipientZcash, 'for tx', sig);
}

main().catch(console.error);
