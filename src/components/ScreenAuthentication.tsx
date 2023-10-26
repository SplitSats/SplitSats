import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image,Text, View } from 'react-native'

import { styles } from '../styles/styles'
import AuthButton from './ButtonAuth'

const AuthenticationScreen = ({ navigation }) => {
	const [userLoggedIn, setUserLoggedIn] = useState(null)
  
	useEffect(() => {
		const checkLoginStatus = async () => {
			const userLoggedIn = await AsyncStorage.getItem('userIsLoggedIn')
			if (userLoggedIn === 'true') {
				console.log('User logged in')
				navigation.navigate('Home')
			} else {
				console.log('User not logged in')
			}
		}

		checkLoginStatus()
	}, [])
	console.log('User logged in:', userLoggedIn)
	if (!userLoggedIn || userLoggedIn === 'false') {
		// User is logged in
		return (
			<View style={styles.mainView}>
				<View style={styles.logoContainer}>
					<Image source={require('../assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
				</View>
				<View style={styles.buttonsContainer}>
					<AuthButton
						label="Create Account"
						description="Your new account will be ready in seconds."
						onPress={() => navigation.navigate('CreateAccount')}
					/>
					<AuthButton
						label="Log In"
						description="Sign in using your Nostr Key!"
						onPress={() => navigation.navigate('LogIn')}
					/>
				</View>
			</View>
		)
	} 
	// User is not logged in
	return <View style={styles.mainView} />
  
}

export default AuthenticationScreen
