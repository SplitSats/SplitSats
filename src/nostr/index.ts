import { l, err } from '@log';
import { IProfileContent } from '@model/nostr';
import { createWallet, getWallet, PRIVATE_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { NDKPrivateKeySigner, NDKEvent } from '@nostr-dev-kit/ndk';
import NDK from '@nostr-dev-kit/ndk';
import { NDKUser } from '@nostr-dev-kit/ndk';
import { defaultRelays, EventKind } from '@nostr/consts';
import { getPublicKey, nip19 } from 'nostr-tools';
import { nip05toNpub } from './util';

class NDKManager {
  private static instance: NDKManager;
  private ndk: NDK | null = null;
  private userNpub: string | null = null;
  private user: NDKUser | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): NDKManager {
    if (!NDKManager.instance) {
      NDKManager.instance = new NDKManager();
    }
    return NDKManager.instance;
  }

  public async initialize(): Promise<void> {
    const privateKey = await getWallet(PRIVATE_KEY_HEX);
    const userPublicKey = getPublicKey(privateKey);
    const npub = nip19.npubEncode(userPublicKey);
    this.userNpub = npub;  
    const signer = new NDKPrivateKeySigner(privateKey || '');
    l('NDK signer:', signer);
    // TODO: Update with user relays
    l('NDK default relays:', defaultRelays);
    this.ndk = new NDK({ explicitRelayUrls: defaultRelays, signer });
    await this.ndk.connect();
  }

  public async queryNostrProfile(query: string): Promise<IProfileContent | null> {
    try {
      if (!this.ndk) {
        throw new Error('NDK not initialized');
      }
  
      let npub: string = '';
  
      if (query.startsWith('npub')) {
        npub = query;
      } else if (query.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        l('Query is a NIP05')
        npub = nip05toNpub(query);
        if (!npub || !npub.startsWith('npub')) {
          return null;
        }
      } else {
        return null;
      }
      
      const nostrUser = this.ndk.getUser({ npub });
      await nostrUser.fetchProfile();
      const userProfile = nostrUser.profile;
      return userProfile;
    } catch (error) {
      err('Error fetching Nostr profile:', error);
      return null;
    }
  }
  
  public async followNpubs(npubs: string[]): Promise<boolean> {
    if (!this.ndk) {
      throw new Error('NDK not initialized');
    }
    try {
      for (const npub of npubs) {
        const nostrUser = this.ndk.getUser({
          npub,
        });
        if (!nostrUser) {
          throw new Error('Nostr user not found');
        }
        const followed = await this.ndk.activeUser?.follow(nostrUser);
        if (!followed) {
          throw new Error('Error following Nostr user');
        }
        l('Nostr user followed:', npub);
      }
      return true;
    } catch (error) {
      err('Error following Nostr user:', error);
      return false;
    }
  }
  
  public async updateNostrProfile(userNpub: string, userProfile: IProfileContent): Promise<boolean> {
    if (!this.ndk) {
      throw new Error('NDK not initialized');
    }

    try {
      const nostrUser = this.ndk.getUser({
        npub: userNpub,
      });

      if (!nostrUser) {
        throw new Error('Nostr user not found');
      }

      setTimeout(async () => {
        await nostrUser.fetchProfile();
      }, 100);

      const ndkEvent = new NDKEvent(this.ndk);
      ndkEvent.kind = EventKind.SetMetadata;
      ndkEvent.content = JSON.stringify(userProfile);
      await ndkEvent.publish();
      l('Nostr user profile updated!', nostrUser.profile);
      return true;
    } catch (error) {
      err('Error updating Nostr profile:', error);
      return false;
    }
  }
}

export default NDKManager;
