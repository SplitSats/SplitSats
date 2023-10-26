import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, StyleSheet,Text, TextInput, View } from 'react-native'

import { useAuth } from '../context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../styles/styles'


const LogInScreen = ({ navigation }) => {
	const { setUserIsLoggedIn } = useAuth()
	const [Nsec, setNsec] = useState('nsec1fea6y6p99mt299zflvtw9m24eun68q3gg7ghqzajrt2w79spflcsmvwe4l')

	const handleLogIn = async () => {
		// Perform user authentication logic using the provided private key
		try {
			const userPrivateKey = nip19.decode(Nsec).data as string
			const userPublicKey = getPublicKey(userPrivateKey)
			// After successful authentication, set the user as logged in
			await AsyncStorage.setItem('userIsLoggedIn', 'true')
			await AsyncStorage.setItem('userPrivateKey', userPrivateKey)
			await AsyncStorage.setItem('userPublicKey', userPublicKey)
		}
		catch (err) {
			console.log(err)
			return null
		}
    
		setUserIsLoggedIn(true)

		// Navigate to the HomeScreen
		navigation.replace('Home')
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
