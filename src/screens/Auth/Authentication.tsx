import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image,Text, View } from 'react-native'

import { styles } from '@styles/styles'
import AuthButton from '@comps/ButtonAuth'
import { getWallet, NPUB } from '@store/secure';
import { l } from '@log'
import { SKIP_AUTH } from '@consts/config'

const AuthenticationScreen = ({ navigation }) => {
	const { reset } = navigation
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	
	useEffect(() => {
		const checkUserLogin = async () => {
			const npub = await getWallet(NPUB);
			l("[AUTH] User npub present in storage: ", npub)
			l('User logged in')
			if (!SKIP_AUTH && npub) {
				reset({index: 0, routes: [{ name: "Dashboard" }]})
				setUserLoggedIn(true)
			}
			else {
				l('User not logged in')
			}
		}
		checkUserLogin()
	}, [])
	
	
	if (!userLoggedIn) {
		// User is not logged in
		return (
			<View style={styles.mainView}>
				<View style={styles.logoContainer}>
					<Image source={require('@assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
				</View>
				<View style={styles.buttonsContainer}>
					<AuthButton
						label="CREATE ACCOUNT"
						description="Your new account will be ready in seconds."
						onPress={() => navigation.navigate('CreateAccount')}
					/>
					<AuthButton
						label="SIGN IN"
						description="Sign in using your Nostr Key!"
						onPress={() => navigation.navigate('LogIn')}
					/>
				</View>
			</View>
		)
	} 
	// User is logged in
	return <View style={styles.mainView} />
  
}

export default AuthenticationScreen
