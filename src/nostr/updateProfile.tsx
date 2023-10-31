import { UserProfile } from './types'; // Import the UserProfile interface
import { useNDK } from '@src/context/NDKContext';
import { l } from '@log'
import { IProfileContent } from '@model/nostr'

// Function to update and publish the Nostr profile
const updateNostrProfile = async (userNpub: string, userProfile: IProfileContent) => {
    const ndk = useNDK();
    
    try {
        // Get the Nostr user using the public key
        const nostrUser = ndk.getUser({
        npub: userNpub,
    });
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
    await nostrUser.publish();
    console.log("Nostr user profile updated:", nostrUser.profile);
    l("Nostr user profile updated:", nostrUser.profile);
    
  } catch (error) {
    // Handle any errors that occur during the update
    console.error('Error updating Nostr profile:', error);
    l('Error updating Nostr profile:', error);
  }
};

export default updateNostrProfile;
