import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, StyleSheet,Text, TextInput, View } from 'react-native'

import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { secureStore, store } from '@store'
import { SECRET, STORE_KEYS, INIT_KEY } from '@store/consts';

const LogInScreen = ({ navigation }) => {
	const { setUserIsLoggedIn } = useAuth()
	const [Nsec, setNsec] = useState(INIT_KEY)
	const [nPub, setNpub] = useState('')

	const handleLogIn = async () => {
		// Perform user authentication logic using the provided private key
		try {
			const userPrivateKey = nip19.decode(Nsec).data as string
			const userPublicKey = getPublicKey(userPrivateKey)
			const npub = nip19.npubEncode(userPublicKey);
			await setNpub(npub)
			// After successful authentication, set the user as logged in
			// Store the private key securely
			await Promise.all([
				secureStore.set(SECRET, userPrivateKey),
			  ])
			// Store the public key in AsyncStorage
			await store.set(STORE_KEYS.npubHex, userPublicKey);
			await store.set(STORE_KEYS.npub, npub);
			await store.set(STORE_KEYS.userLoggedIn, 'true')
		}
		catch (err) {
			console.log(err)
			return null
		}
    
		setUserIsLoggedIn(true)

		// Navigate to the HomeScreen
		navigation.replace('Groups')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LOG IN</Text>

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>PASTE HERE YOUR NOSTR PRIV KEY</Text>
				<TextInput
					style={styles.input}
					placeholder="nsec"
					value={Nsec} // Bind the value to the state
					onChangeText={(text) => setNsec(text)} // Update the state with user input
				/>

			</View>

			<Button title="Log In" style={styles.loginButton} onPress={handleLogIn} />



		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR, // Replace with your primary color
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	inputContainer: {
		width: '100%',
		padding: 20,
		alignItems: 'center',
	},
	inputLabel: {
		color: SECONDARY_COLOR, // Replace with your secondary color
		marginBottom: 10,
	},
	input: {
		width: '100%',
		height: 40,
		borderWidth: 2,
		color: 'white',
		borderColor: SECONDARY_COLOR, // Replace with your secondary color
		borderRadius: 10,
		padding: 10,
	},
	loginButton: {
		backgroundColor: SECONDARY_COLOR, // Replace with your secondary color
		color: 'white',
		borderRadius: 20,
	},
})

export default LogInScreen
