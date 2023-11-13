import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Image, StyleSheet,View } from 'react-native'
import {styles} from '@styles/styles'
import { useUser } from '@hooks'
import { useDispatch } from "@store"
import { initRelays } from "@redux/slices/settingsSlice"
import * as SplashScreen from "expo-splash-screen"

const LoadingScreen = ({ navigation }) => {
	const { reset } = navigation
	const dispatch = useDispatch()
	// const { pubkey } = useUser()
	const pubkey = null
	
	const hideSplashScreen = React.useCallback(async () => {
		await SplashScreen.hideAsync()
	}, [])

	useEffect(() => {
		dispatch(initRelays())
	}, [dispatch])
	useEffect(() => {
		if (pubkey) {
			reset({index: 0, routes: [{ name: "Groups" }]})
		} else {
			reset({index: 0, routes: [{ name: "Authentication" }]})
		}
		setTimeout(() => {
			hideSplashScreen()
		}, 1000)
	}, [pubkey, reset, hideSplashScreen])
  
	return (
		<View style={styles.mainView}>
			<Image source={require('../../assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
		</View>
	)
}

export default LoadingScreen
