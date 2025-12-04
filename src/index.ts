import dotenv from 'dotenv';
dotenv.config();

import { PrivacySwapConfig, configFromEnv } from './config';

export class PrivacySwapClient {
  public network: PrivacySwapConfig['network'];
  public rpcUrl: string;
  public programId: string;

  constructor(cfg?: Partial<PrivacySwapConfig>) {
    const envCfg = configFromEnv();
    const final: PrivacySwapConfig = {
      ...envCfg,
      ...cfg,
    } as PrivacySwapConfig;

    this.network = final.network;
    this.rpcUrl = final.rpcUrl;
    this.programId = final.programId;
  }

  async connect(): Promise<void> {
    // Placeholder: initialize connection to chain using rpcUrl
    // Consumers should implement the actual provider or pass a client instance
    // This method can be extended to instantiate RPC clients (e.g., web3.js, @solana/web3.js)
    if (!this.rpcUrl || !this.programId) {
      throw new Error('RPC URL and programId must be provided');
    }
    // For now, simulate an async connection
    return new Promise((resolve) => setTimeout(resolve, 10));
  }

  info(): { network: string; rpcUrl: string; programId: string } {
    return { network: this.network, rpcUrl: this.rpcUrl, programId: this.programId };
  }
}

export default PrivacySwapClient;
