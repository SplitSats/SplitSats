import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles';
import { l, err } from '@log';
import { useNDK } from '@src/context/NDKContext';
import CreateAccountWrap from "@comps/account/CreateAccountWrap";
import ConfirmButton from '@comps/ConfirmButton';
import { ActivityIndicator } from 'react-native';
import { useUserProfileStore } from '@store'
import { toPrivateKeyHex } from '@nostr/util';
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { relay } from '@nostr/class/Relay'
import { EventKind } from '@nostr/consts'
import { USE_NDK } from '@nostr/consts'
import {updateNDKProfile}  from '@nostr/profile'
import Header from "@comps/Header";


const ConfirmCreateAccountScreen = ({ navigation, route }) => {

	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
  const [loading, setLoading] = useState(false); 
  const ndk = useNDK();

  const [npub, setNpub] = useState("");

  useEffect(() => {
    const createNostrKeys = async () => {
      setLoading(true);
      // Generate a private key for the user
      const userPrivateKey = generatePrivateKey();
      const nsec = nip19.nsecEncode(userPrivateKey);
      // Extract the public key from the private key
      const userPublicKey = getPublicKey(userPrivateKey);
      const npub = nip19.npubEncode(userPublicKey);
      await setNpub(npub);
      l('New nostr keys generated! npub:', npub);
      l('nsec:', nsec);
      l('New nostr keys generated! userPublicKey:', userPublicKey);
      // Store the private key securely
      await createWallet(PRIVATE_KEY_HEX, userPrivateKey);
      await createWallet(PUBLIC_KEY_HEX, userPublicKey);
      await createWallet(NPUB, npub);
      await createWallet(NSEC, nsec);
      setLoading(false);
    };
    createNostrKeys();
  }, []);
  
  const publishNostrProfile = async (npub, userProfile) => {
    const userPrivateKey = await getWallet(PRIVATE_KEY_HEX) || '';
    const userPublicKey = await getWallet(PUBLIC_KEY_HEX);
    let result = false;
    if (USE_NDK) {
      
      result = await updateNDKProfile(ndk, npub, userProfile);
    }
    else {
      const event = {
        kind: EventKind.SetMetadata,
        tags: [],
        content: JSON.stringify(userProfile),
        created_at: Math.ceil(Date.now() / 1000),
      }
      result = await relay.publishEventToPool(event, userPrivateKey);
    }
    if (!result) {
      err('Error publishing Nostr profile');
      return;
    }
    l('Nostr profile published!');
  }

  const handleCreateAccount = async () => {
		setLoading(true);
    if (!userProfile) {
      l('userProfile is null');
      return;
    }
    await publishNostrProfile(npub, userProfile);
    setLoading(false);
    navigation.navigate('FinalConfirmation');
  };
  
  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header title="CONFIRM ACCOUNT" onPressBack={handleBack} />

        <Text style={styles.headerText}></Text>
        <View style={styles.cardContainer}>
          <CreateAccountWrap userProfile={userProfile}/>
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
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
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
