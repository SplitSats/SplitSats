import { l, err } from '@log';
import { IProfileContent } from '@model/nostr';
import { getWallet, PRIVATE_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { NDKPrivateKeySigner, NDKEvent } from '@nostr-dev-kit/ndk';
import { NDKUser } from '@nostr-dev-kit/ndk';
import NDK from '@nostr-dev-kit/ndk'
import { defaultRelays, EventKind } from '@nostr/consts';
import { getPublicKey, nip19 } from 'nostr-tools';
import { nip05toNpub } from './util';


export async function queryNostrProfile(ndk: NDK, query: string): Promise<IProfileContent | null> {
  try {
    if (!ndk) {
      throw new Error('NDK not initialized');
    }

    let npub: string = '';

    if (query.startsWith('npub')) {
      npub = query;
    } else if (query.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      l('Query is a email-like')
      npub = await nip05toNpub(query);
      l('NIP05 converted to Npub:', npub);
      // check if npub is a valid string
      if(!npub || typeof npub !== 'string') {
        return null;
      }
    } else {
      return null;
    }
    
    const nostrUser = ndk.getUser({ npub });
    await nostrUser.fetchProfile();
    const userProfile = nostrUser.profile;
    return userProfile;
  } catch (error) {
    err('Error fetching Nostr profile:', error);
    return null;
  }
}

export async function followNpubs(ndk: NDK, npubs: string[]): Promise<boolean> {
  if (!ndk) {
    throw new Error('NDK not initialized');
  }
  try {
    for (const npub of npubs) {
      const nostrUser = ndk.getUser({ npub });
      if (!nostrUser) {
        throw new Error('Nostr user not found');
      }
      const followed = await ndk.activeUser?.follow(nostrUser);
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

export async function updateNostrProfile(ndk: NDK, userNpub: string, userProfile: IProfileContent): Promise<boolean> {
  if (!ndk) {
    throw new Error('NDK not initialized');
  }

  try {
    const nostrUser = ndk.getUser({ npub: userNpub });

    if (!nostrUser) {
      throw new Error('Nostr user not found');
    }

    setTimeout(async () => {
      await nostrUser.fetchProfile();
    }, 100);

    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = EventKind.SetMetadata;
    ndkEvent.content = JSON.stringify(userProfile);
    await ndkEvent.publish();
    l('[NDK] Nostr user profile updated!', nostrUser.profile);
    return true;
  } catch (error) {
    err('Error updating Nostr profile:', error);
    return false;
  }
}

