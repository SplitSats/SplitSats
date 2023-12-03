import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Platform, FlatList } from 'react-native';

import { PRIMARY_COLOR } from '@styles/styles';
import ConfirmButton from '@comps/ConfirmButton';
import Header from "@comps/Header";
import BannerUploadComponent from '@comps/BannerUploadComponent';
import ImageUploadComponent from '@comps/ImageUploadComponent';
import { generateRandomHumanReadableUserName } from './utils';
import { useUserProfileStore } from '@store';
import { l } from '@log';

const CreateAccountScreen = ({ navigation }) => {
  const [bannerImageUri, setBannerImageUri] = useState('');
  const [profileImageUri, setProfileImageUri] = useState('');

  const randomUserName = generateRandomHumanReadableUserName(2);

  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    setUserProfile({
      about: 'A new SplitSats User',
      display_name: randomUserName,
      username: randomUserName,
      ...userProfile, // Preserve existing values from the store
    });
  }, []);

  const handleNextButton = () => {
    setUserProfile({
      ...userProfile,
      banner: bannerImageUri,
      picture: profileImageUri,
    });

    l('User profile create Account:', userProfile);
    navigation.replace('ConfirmCreateAccount', { userProfile });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={item.placeholder}
        value={userProfile[item.key]}
        onChangeText={(text) => setUserProfile({ ...userProfile, [item.key]: text })}
      />
    </View>
  );

  const formFields = [
	{
		key: 'username',
		label: 'USERNAME*',
		placeholder: 'Username',
	},
	{
	  key: 'display_name',
	  label: 'DISPLAY NAME',
	  placeholder: 'Display Name',
	},
	{
		key: 'nip05',
		label: 'NOSTR VERIFICATION (NIP05)',
		placeholder: 'Nip05',
	  },
	{
	  key: 'about',
	  label: 'ABOUT ME',
	  placeholder: 'A peer in a p2p expense sharing app',
	},
  ];
  return (

    <SafeAreaView style={styles.container}>
        <Header title="NEW ACCOUNT" onPressBack={handleBack} />
        <View style={styles.containerPhotos}>
          <BannerUploadComponent imageUri={bannerImageUri} setImageUri={setBannerImageUri} />
          <ImageUploadComponent imageUri={profileImageUri} setImageUri={setProfileImageUri} />
        </View>
		<FlatList
          data={formFields}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.formContainer}
        />
      <ConfirmButton title="NEXT" onPress={handleNextButton} disabled={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
	backgroundColor: PRIMARY_COLOR,
  },
  formContainer: {
    paddingHorizontal: 32,
    paddingBottom: 10,
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
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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

export default CreateAccountScreen;
