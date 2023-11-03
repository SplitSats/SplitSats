import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles';
import updateNostrProfile from '@nostr/updateProfile';
import { useAuth } from '@src/context/AuthContext'; // Import the AuthContext
import { l, err } from '@log';
import { secureStore, store } from '@store'
import { IProfileContent } from '@src/model/nostr';
import { useNDK } from '@src/context/NDKContext';
import CreateAccountWrap from "@comps/account/CreateAccountWrap";
import ConfirmButton from '@comps/ConfirmButton';
import { SECRET, STORE_KEYS } from '@store/consts';
import { ActivityIndicator } from 'react-native';


const ConfirmCreateAccountScreen = ({ navigation, route }) => {
  const { setUserIsLoggedIn } = useAuth();
  const ndk = useNDK();

  const { userProfile } = route.params;
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    if (loading) {
      // Perform loading-related actions, e.g., disable UI elements
    } else {
      // Perform actions when loading is completed
    }
  }, [loading]);


  const publishNostrProfile = async ( npub: string, userProfile: IProfileContent ) => {
    l("Publishing Profile for npub:", npub)
    try {
      const nostrUser = ndk.getUser({
        npub: npub,
      });
      if (!nostrUser) {
        throw new Error('Nostr user not found');
      }
      // Fetch the existing profile
      await nostrUser.fetchProfile();
      l('Nostr user profile:', nostrUser.profile);

      // Update the profile fields
      nostrUser.profile.name = userProfile.name;
      nostrUser.profile.displayName = userProfile.displayName;
      nostrUser.profile.about = userProfile.about;
      nostrUser.profile.image = userProfile.picture;
      nostrUser.profile.banner = userProfile.banner;
      nostrUser.profile.lud16 = userProfile.lud16;
      nostrUser.profile.nip05 = userProfile.nip05;

      // Publish the updated profile
      await Promise.all([nostrUser.publish()]);
      
      l('Nostr user profile updated!', nostrUser.profile);
    } catch (error) {
      err('Error updating Nostr profile:', error);
    }
  }
  
  const handleCreateAccount = async () => {
		setLoading(true);

    // Generate a private key for the user
    const userPrivateKey = generatePrivateKey();
    // Extract the public key from the private key
    const userPublicKey = getPublicKey(userPrivateKey);
    const nsec = nip19.nsecEncode(userPrivateKey);
    const npub = nip19.npubEncode(userPublicKey);
    l('userPrivateKey:', nsec);
    l('userPublicKey:', npub);
    
    l('userProfile on Confirm:', userProfile);
    if (!userProfile) {
      l('userProfile is null');
      return;
    }

    // Store the private key securely
    await Promise.all([
      secureStore.set(SECRET, userPrivateKey),
      
    ])
    // Store the public key in AsyncStorage
    await store.set(STORE_KEYS.npubHex, userPublicKey);
    await store.set(STORE_KEYS.npub, npub);
    await store.set(STORE_KEYS.userLoggedIn, 'true')
    await store.set(STORE_KEYS.userProfile, JSON.stringify(userProfile))
    setUserIsLoggedIn(true);

    // Publish the user profile to Nostr
    await publishNostrProfile(npub, userProfile);
    // wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
		setLoading(false)

    // Navigate to the HomeScreen
    navigation.replace('Groups');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>CONFIRM ACCOUNT</Text>
        <View style={styles.cardContainer}>
            <CreateAccountWrap userProfile={userProfile} />
        </View>
        <Text style={styles.noteTextt}>
          This is a preview of your Nostr account.
          You can always change your info from the profile settings.
        </Text>
        <ConfirmButton
          title="CREATE ACCOUNT"
          onPress={handleCreateAccount}
          disabled={loading} // Disable the button when loading
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />} 
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    alignItems: 'center',
  },
  cardContainer:{
      width:'100%',
      borderWidth:3,
      borderColor:'#83A3EE',
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 10,
      alignSelf:'flex-start',
      marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  noteTextt: {
    color: 'white',
    padding:30,
    textAlign:'center',
    fontSize:16,
  },
  button: {
  position:'absolute',
  borderRadius: 25, 
  backgroundColor: '#3282B8', // Color of the button
  width:'90%',
  height:50,
  alignSelf: 'center', 
  overflow: 'hidden',
  bottom: 20,
  },
});

export default ConfirmCreateAccountScreen;
