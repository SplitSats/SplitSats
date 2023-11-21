import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Image, StyleSheet,View } from 'react-native'
import {styles} from '@styles/styles'
import * as SplashScreen from "expo-splash-screen"

const LoadingScreen = ({ navigation }) => {
	const { reset } = navigation
	
	const hideSplashScreen = React.useCallback(async () => {
		await SplashScreen.hideAsync()
	}, [])

	useEffect(() => {
		reset({index: 0, routes: [{ name: "Authentication" }]})
	}, [reset])

	return (
		<View style={styles.mainView}>
			<Image source={require('@assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
		</View>
	)
}

export default LoadingScreen
