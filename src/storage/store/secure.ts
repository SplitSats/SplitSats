import * as SecureStore from 'expo-secure-store';
import { err } from '@log';

export const WORDS = 'words';
export const NPUB = 'npub';
export const NSEC = 'nsec';
export const PUBLIC_KEY_HEX = 'public_key_hex';
export const PRIVATE_KEY_HEX = 'private_key_hex';

export type WalletType =
  | typeof WORDS
  | typeof PRIVATE_KEY_HEX
  | typeof PUBLIC_KEY_HEX
  | typeof NPUB
  | typeof NSEC;

export async function createWallet(type: WalletType, data: string): Promise<void> {
  await SecureStore.setItemAsync(type, data);
}

export async function getWallet(type: WalletType): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(type);
  }
  catch (e) {
    err(e);
    return null;
  }
}

export async function deleteWallet(type: WalletType): Promise<void> {
  await SecureStore.deleteItemAsync(type);
}