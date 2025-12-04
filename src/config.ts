export type Network = 'devnet' | 'mainnet';

export interface PrivacySwapConfig {
  network: Network;
  rpcUrl: string;
  programId: string;
}

export function configFromEnv(): PrivacySwapConfig {
  const network = (process.env.PRIVACY_SWAP_NETWORK as Network) || 'devnet';
  const rpcUrl = network === 'devnet'
    ? process.env.DEVNET_RPC_URL || ''
    : process.env.MAINNET_RPC_URL || '';
  const programId = network === 'devnet'
    ? process.env.DEVNET_PRIVACY_SWAP_PROGRAM_ID || ''
    : process.env.MAINNET_PRIVACY_SWAP_PROGRAM_ID || '';

  if (!rpcUrl) {
    throw new Error(`RPC URL is required for network ${network}. Set DEVNET_RPC_URL or MAINNET_RPC_URL in environment.`);
  }

  if (!programId) {
    throw new Error(`Program ID is required for network ${network}. Set DEVNET_PRIVACY_SWAP_PROGRAM_ID or MAINNET_PRIVACY_SWAP_PROGRAM_ID in environment.`);
  }

  return { network, rpcUrl, programId };
}
