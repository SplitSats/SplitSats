import { defaultRelays, EventKind } from '@nostr/consts';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export async function updateNDKProfile(ndk, userNpub, userProfile) {
    if (!ndk) {
      throw new Error('NDK not initialized');
    }
    try {
      const nostrUser = ndk.getUser({
        npub: userNpub,
      });
      if (!nostrUser) {
        throw new Error('Nostr user not found');
      }
      await new Promise((resolve) => setTimeout(resolve, 100)); // Using Promise to create a delay
      await nostrUser.fetchProfile();
      const ndkEvent = new NDKEvent(ndk);
      ndkEvent.kind = EventKind.SetMetadata;
      ndkEvent.content = JSON.stringify(userProfile);
      await ndkEvent.publish();
      console.log('Nostr user profile updated!', nostrUser.profile);
      return true;
    } catch (error) {
      console.error('Error updating Nostr profile:', error);
      return false;
    }
  }