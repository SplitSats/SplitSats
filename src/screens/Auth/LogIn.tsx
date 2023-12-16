import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, StyleSheet,Text, TextInput, View, SafeAreaView } from 'react-native'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import {  INIT_KEY } from '@store/consts';
import ButtonConfirm from '@comps/ButtonConfirm'
import { ActivityIndicator } from 'react-native';
import { l, err } from '@log';
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';
import Header from "@comps/Header";


import * as secp from "@noble/secp256k1"

const LogInScreen = ({ navigation }) => {
	const [userInputSecret, setUserInputSecret] = useState(INIT_KEY)
	const [loading, setLoading] = useState(false); 
	const [error, setError] = useState("")
	
	
	const handlePrivateKeySubmit = async () => {
		// Perform user authentication logic using the provided private key
		setError("")
		setLoading(true)

		l('LogInScreen handleLogIn')
		try {
			let validPrivateKey: string
			let validPubkey: string
			// TODO: Use to privateKeyHex function 
			l('userInputSecret:', userInputSecret)
			if (userInputSecret.startsWith("nsec")) {
			  const { data } = nip19.decode(userInputSecret)
			  const hexPrivateKey = data as string
			  const hexPubkey = getPublicKey(hexPrivateKey)
			  validPrivateKey = hexPrivateKey
			  validPubkey = hexPubkey
			} else {
			  if (secp.utils.isValidPrivateKey(userInputSecret)) {
				const hexPrivateKey = userInputSecret
				const hexPubkey = getPublicKey(hexPrivateKey)
				validPrivateKey = hexPrivateKey
				validPubkey = hexPubkey
			  } else {
				throw new Error("Invalid private key")
			  }
			}
			const nsec = nip19.nsecEncode(validPrivateKey);
			const npub = nip19.npubEncode(validPubkey);
			l("Welcome back - ", npub)
			await createWallet(NSEC, nsec);
			await createWallet(NPUB, npub);
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
	const handleBack = () => {
		navigation.goBack();
	}  
	  
	return (
		<SafeAreaView style={styles.container}>
			<Header title="SIGN IN" onPressBack={handleBack} />

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>PASTE HERE YOUR NOSTR PRIV KEY</Text>
				<TextInput
					style={styles.input}
					placeholder="nsec"
					value={userInputSecret} // Bind the value to the state
					onChangeText={(text) => setUserInputSecret(text)} // Update the state with user input
				/>

			</View>
			<ButtonConfirm
				title="PASTE YOUR KEY"
				onPress={handlePrivateKeySubmit}
				disabled={loading} // Disable the button when loading
    		/>
      		{loading && <ActivityIndicator size="large" color="#0000ff" />} 
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR, // Replace with your primary color
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
		marginTop: "50%",

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
