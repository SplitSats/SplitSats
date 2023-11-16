import { useNDK } from '@src/context/NDKContext';
import { l, err } from '@log'
import { IProfileContent } from '@model/nostr'

// Function to update and publish the Nostr profile
const updateNostrProfile = async (userNpub: string, userProfile: IProfileContent) => {
    const ndk = useNDK();
    
    try {
        // Get the Nostr user using the public key
        const nostrUser = ndk.getUser({
        npub: userNpub,
      });
      if (!nostrUser) {
        throw new Error('Nostr user not found');
      }
      l('Nostr user:', nostrUser)
      console.log('Nostr user:', nostrUser)
      // Fetch the existing profile
      await nostrUser.fetchProfile();

      console.log('Nostr user profile:', nostrUser.profile)
      l('Nostr user profile:', nostrUser.profile)
      // Update the profile fields
      nostrUser.profile.about = userProfile.about;
      nostrUser.profile.banner = userProfile.banner;
      
      nostrUser.profile.name = userProfile.name;
      nostrUser.profile.lud16 = userProfile.lud16;
      nostrUser.profile.nip05 = userProfile.nip05;

      // Publish the updated profile
      // await nostrUser.publish();
      await Promise.all([nostrUser.publish()]);
      l('Nostr user profile updated!', nostrUser.profile);
      
    } catch (error) {
      // Handle any errors that occur during the update
      err('Error updating Nostr profile:', error);
    }
};

export default updateNostrProfile;
