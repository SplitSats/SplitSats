import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, TouchableOpacity, Image, StyleSheet,Text, TextInput, View } from 'react-native'

import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import AddImageButton from '@comps/ButtonAddImage'
import * as ImagePicker from 'expo-image-picker';
import TextInputWithDescription from '@comps/account/TextInputAccount'

// Define the user profile interface
interface UserProfile {
	userName?: string;
	displayName?: string;
	nip05?: string;
	lud16?: string;
	aboutMe?: string;
}


const ConfirmCreateAccountScreen = ({ navigation }) => {
	const { setUserIsLoggedIn } = useAuth()
	const [username, setUsername] = useState('')
	const [privateKey, setPrivateKey] = useState('')
	const [publicKey, setPublicKey] = useState('')
	
	const [profileImage, setProfileImage] = useState(null); // Store the selected profile image
  	const [backgroundImage, setBackgroundImage] = useState(null); // Store the selected background image


	const [userProfile, setUserProfile] = useState<UserProfile>({
		userName: '',
		displayName: '',
		nip05: '',
		lud16: '',
	})

	const handleSelectProfileImage = async () => {
		// Use the image picker to select a profile image
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		
		console.log(result);

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
		else {
			console.log('User cancelled image picker');
		}

	  };
	
	  const handleSelectBackgroundImage = async () => {
		// Use the image picker to select a profile image
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		
		console.log(result);

		if (!result.canceled) {
			setBackgroundImage(result.assets[0].uri);
		}
		else {
			console.log('User cancelled image picker');
		}
	  };

	const handleCreateAccount = async () => {
		// Generate a private key for the user
		const userPrivateKey = generatePrivateKey()  
		const nsec = nip19.nsecEncode(userPrivateKey)
		// Extract the public key from the private key
		const userPublicKey = getPublicKey(userPrivateKey)
		const npub = nip19.npubEncode(userPublicKey)
		console.log('userPrivateKey:', nsec)
		console.log('userPublicKey:', npub)
    
		// Store the private key securely, such as in AsyncStorage
		await AsyncStorage.setItem('userPrivateKey', userPrivateKey)
		await AsyncStorage.setItem('userPublicKey', userPublicKey)
		await AsyncStorage.setItem('userIsLoggedIn', 'true')
		setUserIsLoggedIn(true)

		// Publish the user profile to Nostr
		updateNostrProfile(publicKey, userProfile) // Call the updateNostrProfile function

		// Navigate to the HomeScreen
		navigation.replace('Groups')
	}

	return (
		<View style={styles.container}>

			<Text style={styles.title}>NEW ACCOUNT</Text>
			
			<View style={{ alignItems: 'center', flexDirection: 'row',  padding: 16, }}>
			
				{/* Profile Image Selection */}
				<View style={styles.photoContainer}>
					<TouchableOpacity onPress={handleSelectProfileImage}>
						{profileImage ? (
							<Image source={{ uri: profileImage }} style={styles.photoIcon} />
						) : (
							<View style={styles.photoIcon}>
								<Text style={{ color: 'white' }}>Select Profile Image</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
				{/* Background Image Selection */}
				<View style={styles.backgroundImageContainer}>
					<TouchableOpacity onPress={handleSelectBackgroundImage}>
						{backgroundImage ? (
						<Image source={{ uri: backgroundImage }} style={styles.backgroundImage} />
						) : (
						<View style={styles.backgroundImage}>
							<Text style={{ color: 'white' }}>Select Background Image</Text>
						</View>
						)}
					</TouchableOpacity>
				</View>

			</View>

			<TextInputWithDescription description="USERNAME*" value={userProfile.userName} onChangeText={(text) => setUserProfile({ ...userProfile, userName: text })} />
			<TextInputWithDescription description="DISPLAY NAME" value={userProfile.displayName} onChangeText={(text) => setUserProfile({ ...userProfile, displayName: text })} />
			<TextInputWithDescription description="LNURL" value={userProfile.lud16} onChangeText={(text) => setUserProfile({ ...userProfile, lud16: text })} />
			<TextInputWithDescription description="NOSTR VERIFICATION (NIP-05)" value={userProfile.nip05} onChangeText={(text) => setUserProfile({ ...userProfile, nip05: text })} />
			<TextInputWithDescription description="ABOUT ME" value={userProfile.aboutMe} onChangeText={(text) => setUserProfile({ ...userProfile, aboutMe: text })} />

			<TouchableOpacity onPress={() => console.log('Next button pressed')}>
				<View style={styles.continueButton}>
					<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>NEXT</Text>
				</View>
        	</TouchableOpacity>
			
		</View>
	)
}

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
		// ALL WIDHT
		
	},
})

export default ConfirmCreateAccountScreen
