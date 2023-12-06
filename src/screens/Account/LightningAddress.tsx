import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, Platform, FlatList } from 'react-native';

import { PRIMARY_COLOR } from '@styles/styles';
import ConfirmButton from '@comps/ConfirmButton';
import Header from "@comps/Header";
import BannerUploadComponent from '@comps/BannerUploadComponent';
import ImageUploadComponent from '@comps/ImageUploadComponent';
import { generateRandomHumanReadableUserName } from './utils';
import { useUserProfileStore } from '@store';
import { l } from '@log';
import { use } from 'i18next';

const LightningAddressScreen = ({ navigation }) => {

  const { userProfile, setUserProfile } = useUserProfileStore();
  const [userLightningAddress, setUserLightningAddress] = useState('');

  useEffect(() => {
    const setLightingAddress = async () => {
      const username = userProfile?.username || '';
      const lud16 = `${username}@getalby.com`;
      setUserLightningAddress(lud16);
    }
    setLightingAddress();
  }, []);

  const handleNextButton = () => {
    setUserProfile({
      ...userProfile,
    });

    l('User profile create Account:', userProfile);
    navigation.navigate('ConfirmCreateAccount');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="LIGHTNING ADDRESS" onPressBack={handleBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <View style={styles.containerPhotos}>
          <BannerUploadComponent imageUri={userProfile?.banner} />
          <ImageUploadComponent imageUri={userProfile?.picture} />
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>In order to receive and send payments, you need to link your Lightning wallet. With LN URL you’ll need an external wallet installed to pay invoices.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>LIGHTNING ADDRESS</Text>
          <TextInput
            style={styles.input}
            placeholder={userLightningAddress}
            value={userProfile?.lud16}
            onChangeText={(text) => setUserProfile({ ...userProfile, lud16: text })}
          />
        </View>

      </KeyboardAvoidingView>
      <ConfirmButton title="NEXT" onPress={handleNextButton} disabled={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
  },
  containerPhotos: {
    width: '100%',
    height: 130,
    backgroundColor: '#333A4A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 80,
    marginTop: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,

  },
  input: {
    width: '100%',
    height: 40,
    color: 'white',
    backgroundColor: '#333A4A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    color: '#B0B0B0',
    marginBottom: 8,
  },
});

export default LightningAddressScreen;
