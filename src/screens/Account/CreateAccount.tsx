import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, Platform, FlatList } from 'react-native';

import { PRIMARY_COLOR } from '@styles/styles';
import ButtonConfirm from '@comps/ButtonConfirm';
import Header from "@comps/Header";
import BannerUploadComponent from '@comps/BannerUploadComponent';
import ImageUploadComponent from '@comps/ImageUploadComponent';
import ConfirmModal  from "@comps/ModalConfirm"; 
import { generateRandomHumanReadableUserName } from './utils';
import { useUserProfileStore } from '@store';
import { l } from '@log';

const CreateAccountScreen = ({ navigation }) => {
  const [bannerImageUri, setBannerImageUri] = useState('');
  const [profileImageUri, setProfileImageUri] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const randomUserName = generateRandomHumanReadableUserName(2);

  const { userProfile, setUserProfile } = useUserProfileStore();

  const initialProfile: NostrProfileContent = {
    about: 'A new SplitSats User',
    banner: '',
    display_name: randomUserName,
    lud16: `${randomUserName}@getalby.com`,
    name: randomUserName,
    nip05: `${randomUserName}@splitsats.io`,
    picture: '',
    username: `${randomUserName}`,
    };

  useEffect(() => {
    setUserProfile(initialProfile);
  }, []);

  const handleNextButton = async () => {
    await setUserProfile({
      ...userProfile,
      banner: bannerImageUri,
      picture: profileImageUri,
    });

    l('User profile create Account:', userProfile);
    setIsModalVisible(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleYes = () => {
    navigation.navigate('WalletScreen');
    closeModal();
  };

  const handleNo = () => {
    navigation.navigate('LightningAddressScreen');
    closeModal();
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
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
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
      </KeyboardAvoidingView>
      <ConfirmModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Nostr Wallet Connect"
        description="Do you want to connect or create your wallet with Nostr Wallet Connect to pay in-app?"
        leftButtonTitle="No"
        rightButtonTitle="Yes"
        onLeftButtonPress={handleNo}
        onRightButtonPress={handleYes}
      />

      <ButtonConfirm title="NEXT" onPress={handleNextButton} disabled={false} />
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
