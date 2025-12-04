import { PrivacySwapClient } from '../src/index';

describe('PrivacySwapClient', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('reads devnet values from env', () => {
    process.env.PRIVACY_SWAP_NETWORK = 'devnet';
    process.env.DEVNET_RPC_URL = 'https://devnet.example';
    process.env.DEVNET_PRIVACY_SWAP_PROGRAM_ID = 'DEVPROG1';

    const client = new PrivacySwapClient();
    const info = client.info();
    expect(info.network).toBe('devnet');
    expect(info.rpcUrl).toBe('https://devnet.example');
    expect(info.programId).toBe('DEVPROG1');
  });

  test('throws when missing rpc or program id', () => {
    process.env.PRIVACY_SWAP_NETWORK = 'devnet';
    delete process.env.DEVNET_RPC_URL;
    delete process.env.DEVNET_PRIVACY_SWAP_PROGRAM_ID;

    expect(() => new PrivacySwapClient()).toThrow();
  });
});
