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
import CreateAccountWrap from "@comps/account/CreateAccountWrap";
import ConfirmButton from '@comps/ConfirmButton';


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

    const publishNostrProfile = async () => {
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
        l('Nostr user profile updated!', nostrUser.profile);
      } catch (error) {
        err('Error updating Nostr profile:', error);
      }
    }
    
    // Publish the user profile to Nostr
    await publishNostrProfile();
    // Save the user profile to AsyncStorage
    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));

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
        <ConfirmButton title="CREATE ACCOUNT" onPress={handleCreateAccount} />
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
