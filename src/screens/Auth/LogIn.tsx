import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, StyleSheet,Text, TextInput, View } from 'react-native'

import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { secureStore, store } from '@store'
import { SECRET, STORE_KEYS, INIT_KEY } from '@store/consts';
import ConfirmButton from '@comps/ConfirmButton'
import { ActivityIndicator } from 'react-native';
import { l, err } from '@log';
// import { useUser } from '@hooks'
// import { useDispatch } from "@store"
// import { updateUser } from "@redux/slices/settingsSlice"
// import { useUserProfileStore } from '@store'
// import { toPrivateKeyHex } from '@nostr/util';
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX } from '@store/secure';


import * as secp from "@noble/secp256k1"

const LogInScreen = ({ navigation }) => {
	// const { setUserIsLoggedIn } = useAuth()
	const [Nsec, setNsec] = useState(INIT_KEY)
	const [loading, setLoading] = useState(false); 
	const [privateKey, setPrivateKey] = useState("")
	// const dispatch = useDispatch()
	const [error, setError] = useState("")
	// const user = useUser()

	
	const handlePrivateKeySubmit = async () => {
		// Perform user authentication logic using the provided private key
		setError("")
		setLoading(true)

		l('LogInScreen handleLogIn')
		try {
			let validPrivateKey: string
			let validPubkey: string
			// TODO: Use to privateKeyHex function 
			if (privateKey.startsWith("nsec")) {
			  const { data } = nip19.decode(privateKey)
			  const hexPrivateKey = data as string
			  const hexPubkey = getPublicKey(hexPrivateKey)
			  validPrivateKey = hexPrivateKey
			  validPubkey = hexPubkey
			} else {
			  if (secp.utils.isValidPrivateKey(privateKey)) {
				const hexPrivateKey = privateKey
				const hexPubkey = getPublicKey(hexPrivateKey)
				validPrivateKey = hexPrivateKey
				validPubkey = hexPubkey
			  } else {
				throw new Error("Invalid private key")
			  }
			}
			await createWallet(PRIVATE_KEY_HEX, validPrivateKey);
			await createWallet(PUBLIC_KEY_HEX, validPubkey);
		} catch (e) {
			err(e)
			setError("Invalid private key")
		}

		setLoading(false)
		// Navigate to the HomeScreen
		navigation.navigate('Dashboard');
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
			<ConfirmButton
				title="PASTE YOUR KEY"
				onPress={handlePrivateKeySubmit}
				disabled={loading} // Disable the button when loading
    		/>
      		{loading && <ActivityIndicator size="large" color="#0000ff" />} 
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
