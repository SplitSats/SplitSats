import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, Image, StyleSheet,Text, TextInput, View } from 'react-native'

import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import AddImageButton from '@comps/ButtonAddImage'


// Define the user profile interface
interface UserProfile {
  name: string;
  nip05: string;
  lud16: string;
}


const CreateAccountScreen = ({ navigation }) => {
	const { setUserIsLoggedIn } = useAuth()
	const [username, setUsername] = useState('')
	const [privateKey, setPrivateKey] = useState('')
	const [publicKey, setPublicKey] = useState('')
	const [userProfile, setUserProfile] = useState<UserProfile>({
		name: 'walter',
		nip05: 'walter@nostr.com',
		lud16: 'wally@getalby.com',
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
		setUserIsLoggedIn(true)

		// Publish the user profile to Nostr
		updateNostrProfile(publicKey, userProfile) // Call the updateNostrProfile function

		// Navigate to the HomeScreen
		navigation.replace('Groups')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>NEW ACCOUNT</Text>
			<AddImageButton/>
			<TextInput
				style={styles.input}
				placeholder={username}
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the name from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, name: text })} // Update the UserProfile on input change
			/>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the LN Address from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, lud16: text })} // Update the UserProfile on input change
			/>
			<TextInput
				style={styles.input}
				placeholder={userProfile.nip05}
				value={userProfile.nip05} // Display the NIP05 from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, nip05: text })} // Update the UserProfile on input change
			/>
			<Button title="Create Account" style={styles.createAccountButton} onPress={handleCreateAccount} />
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
	},
	photoIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'light gray', // Replace with your desired background color
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
	createAccountButton: {
		backgroundColor: SECONDARY_COLOR, // Replace with your secondary color
		color: 'white',
		borderRadius: 10,
	},
})

export default CreateAccountScreen
