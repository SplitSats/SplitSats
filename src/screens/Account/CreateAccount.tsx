import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, StyleSheet,Text, TextInput, View } from 'react-native'
import ImageUploadComponent from '@comps/ImageUploadComponent'
import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import BannerUploadComponent from '@comps/BannerUploadComponent'

// Define the user profile interface
interface UserProfile {
  name: string;
  nip05: string;
  lud16: string;
  about_me:string;
}


const CreateAccountScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState<string | ''>('');
	const { setUserIsLoggedIn } = useAuth()
	const [username, setUsername] = useState('')
	const [privateKey, setPrivateKey] = useState('')
	const [publicKey, setPublicKey] = useState('')
	const [userProfile, setUserProfile] = useState<UserProfile>({
		name: 'walter',
		nip05: 'walter@nostr.com',
		lud16: 'wally@getalby.com',
		about_me: 'Lurem ipisum',
	})


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
		await AsyncStorage.setItem('userImageUri', imageUri);
		setUserIsLoggedIn(true)

		// Publish the user profile to Nostr
		updateNostrProfile(publicKey, userProfile) // Call the updateNostrProfile function

		// Navigate to the HomeScreen
		navigation.replace('Confrim')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>NEW ACCOUNT</Text>
			<View style={styles.containerPhotos}>
			<BannerUploadComponent imageUri={imageUri} setImageUri={setImageUri} />
			<ImageUploadComponent imageUri={imageUri} setImageUri={setImageUri} />
			</View>
			<Text style={styles.label}>USERNAME*</Text>
			<TextInput
				style={styles.input}
				placeholder={username}
				value={username}
				onChangeText={setUsername}
			/>
			<Text style={styles.label}>DISPLAY NAME</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the name from the UserProfile
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
				placeholder={userProfile.about_me}
				value={userProfile.about_me} // Display the ABOUT ME from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, about_me: text })} // Update the UserProfile on input change
			/>
			<View style={styles.button}>
			<Button title="NEXT"
			onPress={handleCreateAccount} />
			</View>
		</View>
	)
}
//
const styles = StyleSheet.create({
	containerPhotos: {
		flex: 0,
		width:'100%',
		height:130,
		backgroundColor: '#333A4A',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 80,
		marginTop:20,
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
		position:'absolute',
		borderRadius: 25, 
		backgroundColor: '#3282B8', // Color of the button
		width:'80%',
		height:50,
		alignSelf: 'center', 
		overflow: 'hidden',
		bottom: 20,
	  },
})

export default CreateAccountScreen
