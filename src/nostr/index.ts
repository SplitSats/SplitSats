import { l, err } from '@log';
import { IProfileContent } from '@model/nostr';
import { getWallet, PRIVATE_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { NDKPrivateKeySigner, NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { NDKUser } from '@nostr-dev-kit/ndk';
import NDK from '@nostr-dev-kit/ndk'
import { defaultRelays, EventKind } from '@nostr/consts';
import { getPublicKey, nip19 } from 'nostr-tools';
import { nip05toNpub } from './util';
import { Group, GroupManager } from '@src/managers/group';
import { nip05, nip44 } from 'nostr-tools'
import { nostr } from '@getalby/lightning-tools';
import { G } from 'react-native-svg';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { Contact } from '@src/managers/contact';
import { encrypt, decrypt } from '@nostr/crypto';
import { truncateNpub, getNostrUsername } from '@nostr/util'
import { auth } from '@getalby/sdk';

export async function getUserFollows(ndk: NDK): Promise<Set<NDKUser> | undefined> {
  // Return Set<NDKUser> that the user is following
  const follows = await ndk.activeUser?.follows();
  return follows;
}

export async function initializeNDK() {
	const privateKey = await getWallet(PRIVATE_KEY_HEX);
	if (!privateKey) {
		l('No private key found in storage')
		return null;
	}
	const signer = new NDKPrivateKeySigner(privateKey || '');
	const ndkInstance = new NDK({ explicitRelayUrls: defaultRelays, signer: signer })
	await ndkInstance.connect()
	return ndkInstance;
}

export async function getNostrFriends(ndk: NDK): Promise<Set<NDKUser> | undefined> {
  // Nostr friends is a set of my followers that I follow back
  const follows = await ndk.activeUser?.follows();
  // Todo - save friends on cache and check only new follows
  const friends = new Set<NDKUser>();
  if (follows && follows.size > 0) {
    for (const user of follows) {
      const userFollows = await user?.follows();   
      // Check if I am in the user's follows
      const isFollowAFrind = [...userFollows].some(user => user.pubkey === ndk.activeUser?.pubkey);
      if (isFollowAFrind) {
        await friends.add(user);
      }
    };
  } else {
      l('The "follows" set is empty or undefined.');
    }
  return friends;
}

export async function getNostrEvents(ndk: NDK, authors: string[]): Promise<Set<NDKEvent> | undefined> {
  if (!ndk) {
    throw new Error('NDK not initialized');
  }
  if (authors.length === 0) {
    return new Set<NDKEvent>();
  }
  const filter: NDKFilter = { kinds: [4], authors: authors };
  const events = await ndk.fetchEvents(filter);
  return events;
}

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
      let profile = await nip05.queryProfile(query)
      console.log(profile?.pubkey)
      npub = profile?.pubkey || ''
      // npub = await nip05toNpub(query);
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

export async function decryptNostrEvent(ndk: NDK, event: NDKEvent): Promise<string | null> {
  const sender = ndk.getUser({pubkey: event.pubkey});
  await sender.fetchProfile();
  l(`Event from: ${getNostrUsername(sender.profile)} with content: ${event.content}`);
  try {
    // const decrypted = await event.decrypt(sender);
    const privateKey = await getWallet(PRIVATE_KEY_HEX);
    if (!privateKey) {
      throw new Error('Private key not found');
    }
    const decrypted_text = decrypt(privateKey, event.pubkey, event.content);
    l('Decrypted event:', decrypted_text);
    return decrypted_text;
  } catch (error) {
    l('Error decrypting event:', error);
    return null;
  }
}

export async function publishGroup(ndk: NDK, group: Group): Promise<boolean> {
  if (!ndk) {
    throw new Error('NDK not initialized');
  }
  const groupMembers = group?.members;
  const groupData = JSON.stringify(group.toJSON());
  l('[NDK] Group data:', groupData);
  if (!groupMembers || !groupData) {
    throw new Error('Group members or data not found');
  }
  const privateKey = await getWallet(PRIVATE_KEY_HEX);
  if (!privateKey) {
    throw new Error('Private key not found');
  }
  // const senderHexPubKey =  await ndk.activeUser?.pubkey;

  for (const member of groupMembers) {
    const nostrUser = ndk.getUser({ npub: member });
    if (!nostrUser) {
      err('Nostr user not found: ', member);
      throw new Error('Nostr user not found');
    }
    const receiverPublicKey = nostrUser.pubkey;
    // const sharedKey = nip44.utils.v2.getConversationKey(privateKey, receiverPublicKey);
    // console.log(sharedKey);
    // const ciphertext = nip44.encrypt(sharedKey, groupData);
    const ciphertext = await encrypt(privateKey, receiverPublicKey, groupData);
    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = EventKind.DirectMessage;
    ndkEvent.tag(nostrUser, 'p');
    // ndkEvent.kind = EventKind.SplitGroupRequest;
    
    ndkEvent.content = ciphertext;
    await ndkEvent.publish();
    l('[NDK] Group request sent to:', member);
  l('[NDK] Group published!', ndkEvent);
  }

}
export async function zapUser(ndk: NDK, npub: string, amount: integer, comment: string): Promise<string> {
  if (!ndk) {
    throw new Error('NDK not initialized');
  }
  const nostrUser = await ndk.getUser({ npub: npub });
  if (!nostrUser) {
    err('Nostr user not found: ', contact.npub);
    throw new Error('Nostr user not found');
  }
  l('[NDK] Zapping user:', nostrUser)
  const paymentRequest = await nostrUser.zap(amount, comment);
  // sleep for 2 seconds
  await new Promise(r => setTimeout(r, 2000));
  l('[NDK] Payment request:', paymentRequest);
  return paymentRequest;
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

