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
	// Load any resources or data that we need prior to rendering the app
	// useEffect(() => {
	// 	async function loadResourcesAndDataAsync() {
	// 		try {
	// 			SplashScreen.preventAutoHideAsync();
	// 			// Load fonts
	// 			// await Font.loadAsync({
	// 			// ...Octicons.font,
	// 			// "space-mono": require("@assets/fonts/SpaceMono-Regular.ttf"),
	// 			// });	
	// 		} catch (e) {
	// 			// We might want to provide this error information to an error reporting service
	// 			console.warn(e);
	// 		} finally {
	// 			SplashScreen.hideAsync();
	// 		}
	// 	}
	// 	loadResourcesAndDataAsync();			
	// }, []);

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
