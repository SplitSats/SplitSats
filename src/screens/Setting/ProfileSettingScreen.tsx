import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, Button, SafeAreaView, StyleSheet,Text, TextInput, View,  KeyboardAvoidingView, Platform, FlatList  } from 'react-native'
import ImageUploadComponent from '@comps/ImageUploadComponent'
import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { IProfileContent } from '@src/model/nostr';
import { l, err } from '@log';
import BannerUploadComponent from '@comps/BannerUploadComponent'
import ConfirmButton from '@comps/ConfirmButton'
import { updateNDKProfile }  from '@nostr/profile'
import { useNDK } from '@src/context/NDKContext';
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { useUserProfileStore } from '@store'
import Header from "@comps/Header";

const ProfileSettingScreen = ({ navigation }) => {

	const [bannerImageUri, setBannerImageUri] = useState('');
	const [profileImageUri, setProfileImageUri] = useState('');

	const [loading, setLoading] = useState(false); 
	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
	const ndk = useNDK();
	
	useEffect(() => {
		console.log(userProfile);
		if (userProfile) {
		  setBannerImageUri(userProfile.banner);
		  setProfileImageUri(userProfile.picture);
		}
	}, 
	[userProfile]);

	const publishNostrProfile = async (npub, userProfile) => {
		let result = false;
		result = await updateNDKProfile(ndk, npub, userProfile);
		if (!result) {
			err('Error publishing Nostr profile');
			return;
		}
		l('Nostr profile published!');
	}

	const handleUpdateProfile = async () => {
		setLoading(true);
		if (!userProfile) {
			l('userProfile is null');
			return;
		}
		// Set the banner and profile images in the user profile
		userProfile.banner = bannerImageUri;
		userProfile.picture = profileImageUri;
		
		l('User profile create Account:', userProfile)
		await publishNostrProfile(npub, userProfile);
		setUserProfile(userProfile);
		setLoading(false);
		navigation.replace('Dashboard');
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
		  <Header title="PROFILE" onPressBack={handleBack} />

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
			<ConfirmButton title="UPDATE PROFILE" onPress={handleUpdateProfile} disabled={false}/>
		</SafeAreaView>
	)
}

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
	  
})

export default ProfileSettingScreen