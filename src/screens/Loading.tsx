import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Image, StyleSheet,View } from 'react-native'
import {styles} from '@styles/styles'
import * as SplashScreen from "expo-splash-screen"
import { getWallet, NPUB } from '@store/secure';
import { l } from '@log'


const LoadingScreen = ({ navigation }) => {
	const { reset } = navigation
	

	const handleUserLogin = async () => {
		const npub = await getWallet(NPUB);
		l("[LOADING] User npub present in storage: ", npub)
		l('User logged in')
		if (npub) {
			reset({index: 0, routes: [{ name: "Dashboard" }]})
		}
		else {
			l('User not logged in')
			navigation.navigate('Authentication')
		}
	}

	const hideSplashScreen = React.useCallback(async () => {
		await SplashScreen.hideAsync()
	}, [])
	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();
				await handleUserLogin()
			} catch (e) {
				console.warn(e);
			} finally {
				SplashScreen.hideAsync();
			}
		}
		loadResourcesAndDataAsync();			
	}, []);

	return (
		<View style={styles.mainView}>
			<Image source={require('@assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
		</View>
	)
}

export default LoadingScreen
