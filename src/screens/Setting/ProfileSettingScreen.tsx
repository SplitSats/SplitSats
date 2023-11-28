import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useContext, useState } from 'react'
import { ScrollView, Button, StyleSheet,Text, TextInput, View } from 'react-native'
import ImageUploadComponent from '@comps/ImageUploadComponent'
import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { IProfileContent } from '@src/model/nostr';
import { l } from '@log';
import BannerUploadComponent from '@comps/BannerUploadComponent'
import ConfirmButton from '@comps/ConfirmButton'

const ProfileSettingScreen = ({ navigation }) => {

	const [bannerImageUri, setBannerImageUri] = useState('');
  	const [profileImageUri, setProfileImageUri] = useState('');
	

	const initialProfile: IProfileContent = {
		about: 'A new SplitSats User',
		banner: '',
		displayName: 'SplitSats User',
		lud06: 'LNURL',
		lud16: 'splitsats@getalby.com',
		name: 'splitsats',
		nip05: 'splitsats@nostr.com',
		picture: '',
		username: 'splitsats01',
		website: '',
	};

	const [userProfile, setUserProfile] = useState<IProfileContent>(initialProfile);
	
	const handleNextButton = async () => {
		// Set the banner and profile images in the user profile
		userProfile.banner = bannerImageUri;
		userProfile.picture = profileImageUri;
		
		l('User profile create Account:', userProfile)
		navigation.replace('ConfirmCreateAccount', { userProfile })
	}
	
	l("ProfileSettingScreen")
	
	return (
		<ScrollView contentContainerStyle={styles.container}>
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
			<Text style={styles.label}>LN URL</Text>
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
			<ConfirmButton title="NEXT" onPress={handleNextButton} />
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