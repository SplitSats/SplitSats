import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, Button, StyleSheet,Text, TextInput, View } from 'react-native'
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

	return (
		<ScrollView contentContainerStyle={styles.container}>
	      <Header title="PROFILE" onPressBack={handleBack} />

			<View style={styles.containerPhotos}>
      			<BannerUploadComponent imageUri={bannerImageUri} setImageUri={setBannerImageUri} />
				<ImageUploadComponent imageUri={profileImageUri} setImageUri={setProfileImageUri} />
      
			</View>
			<Text style={styles.label}>USERNAME*</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.username}
				value={userProfile.username}
				onChangeText={(text) => setUserProfile({ ...userProfile, username: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>DISPLAY NAME</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.name}
				value={userProfile.name} // Display the name from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, name: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>LN ADDRESS</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the LN Address from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, lud16: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>NOSTR VERIFICATION (NIP05)</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.nip05}
				value={userProfile.nip05} // Display the NIP05 from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, nip05: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>ABOUT ME</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.about}
				value={userProfile.about} // Display the ABOUT ME from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, about: text })} // Update the UserProfile on input change
			/>
			<ConfirmButton title="UPDATE PROFILE" onPress={handleUpdateProfile} />
		</ScrollView>
		
	)
}

const styles = StyleSheet.create({
	containerPhotos: {
		flex: 0,
		width:'100%',
		height:130,
		backgroundColor: '#333A4A',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 80,
	  },
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
	input: {
		width: '80%',
		height: 40,
		color: 'white',
		backgroundColor: '#333A4A',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	label: {
		alignSelf: 'flex-start',  // Aligns text to the left
		marginLeft: '10%',
		color: '#B0B0B0',
		marginBottom: 8,  // Adjust as per spacing required between label and input
	},
	button: {
		position: 'absolute',
		borderRadius: 25,
		backgroundColor: '#3282B8', // Background color of the button
		width: '80%',
		height: 50,
		alignSelf: 'center',
		overflow: 'hidden',
		bottom: 20,
		justifyContent: 'center', // Center vertically
		alignItems: 'center', // Center horizontally
		color: '#000000', // Text color
	}

	  
})

export default ProfileSettingScreen