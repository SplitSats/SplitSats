import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '../styles/styles'
import UserProfile from './account/UserProfile'
import LogOutButton from './ButtonLogOut'

const ScreenAccount = ({ navigation }) => 
// Add here settings for profile, relays, wallet, logout
	(


		<View style={styles.mainView}>
      
			<UserProfile />
			<LogOutButton navigation={navigation} />
      
		</View>
	)


export default ScreenAccount
