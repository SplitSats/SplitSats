import { l, err } from '@log';
import { IProfileContent } from '@model/nostr';
import { createWallet, getWallet, PRIVATE_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { NDKPrivateKeySigner, NDKEvent } from '@nostr-dev-kit/ndk';
import NDK from '@nostr-dev-kit/ndk';
import { defaultRelays, EventKind } from '@nostr/consts';

class NDKManager {
  private static instance: NDKManager;
  private ndk: NDK | null = null;

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
    const signer = new NDKPrivateKeySigner(privateKey || '');
    l('NDK signer:', signer);
    // TODO: Update with user relays
    l('NDK default relays:', defaultRelays);
    this.ndk = new NDK({ explicitRelayUrls: defaultRelays, signer });
    await this.ndk.connect();
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
