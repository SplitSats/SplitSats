import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles';
import updateNostrProfile from '@nostr/updateProfile';
import { useAuth } from '@src/context/AuthContext'; // Import the AuthContext
import { l, err } from '@log';
import { IProfileContent } from '@src/model/nostr';
import { useNDK } from '@src/context/NDKContext';

const ConfirmCreateAccountScreen = ({ navigation, route }) => {
  const { setUserIsLoggedIn } = useAuth();
  const { userProfile } = route.params;
  const [publicKey, setPublicKey] = useState('');

  const handleCreateAccount = async () => {
    // Generate a private key for the user
    const userPrivateKey = generatePrivateKey();
    const nsec = nip19.nsecEncode(userPrivateKey);
    const ndk = useNDK(nsec);

    // Extract the public key from the private key
    const userPublicKey = getPublicKey(userPrivateKey);
    const npub = nip19.npubEncode(userPublicKey);
    console.log('userPrivateKey:', nsec);
    l('userPrivateKey:', nsec);
    console.log('userPublicKey:', npub);
    l('userPublicKey:', npub);
    
    l('userProfile on Confirm:', userProfile);
    if (!userProfile) {
      l('userProfile is null');
      return;
    }

    // Store the private key securely, such as in AsyncStorage
    await AsyncStorage.setItem('userPrivateKey', userPrivateKey);
    await AsyncStorage.setItem('userNsec', nsec);
    await AsyncStorage.setItem('userNpub', npub);
    await AsyncStorage.setItem('userIsLoggedIn', 'true');
    setUserIsLoggedIn(true);

    // Publish the user profile to Nostr
    // Publish the user profile to Nostr
    l("NPUB:", npub)
    try {
      const nostrUser = ndk.getUser({
        npub: npub,
      });

      // Fetch the existing profile
      await nostrUser.fetchProfile();
      l('Nostr user profile:', nostrUser.profile);

      // Update the profile fields
      nostrUser.profile.name = userProfile.name;
      nostrUser.profile.about = userProfile.about;
      nostrUser.profile.banner = userProfile.banner;
      nostrUser.profile.lud16 = userProfile.lud16;
      nostrUser.profile.nip05 = userProfile.nip05;

      // Publish the updated profile
      await nostrUser.publish();
      console.log('Nostr user profile updated:', nostrUser.profile);
      l('Nostr user profile updated!', nostrUser.profile);
    } catch (error) {
      // Handle any errors that occur during the update
      console.error('Error updating Nostr profile:', error);
      err('Error updating Nostr profile:', error);
    }

    // Save the user profile to AsyncStorage
    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Navigate to the HomeScreen
    navigation.replace('Groups');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONFIRM ACCOUNT</Text>
      <View style={{ alignItems: 'center', flexDirection: 'row', padding: 16 }}>
        <TouchableOpacity onPress={handleCreateAccount}>
          <View style={styles.continueButton}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>CONFIRM</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  photoContainer: {
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'light gray', // Replace with your desired background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    position: 'absolute',
    bottom: 0, // Positioned at the bottom
    left: 10, // Positioned at the left with some spacing
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'darkgray', // Dark gray background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'darkgray', // Dark gray background color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Added relative positioning
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    color: 'white',
    borderWidth: 2,
    borderColor: SECONDARY_COLOR, // Replace with your secondary color
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    paddingVertical: 12,
    padding: 10,
    alignItems: 'center',
    // ALL WIDTH

  },
});

export default ConfirmCreateAccountScreen;
