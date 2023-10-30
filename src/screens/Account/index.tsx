import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '@styles/styles'
import UserProfile from '@comps/account/UserProfile'
import LogOutButton from '@comps/ButtonLogOut'

const AccountScreen = ({ navigation }) => 
	// Add here settings for profile, relays, wallet, logout
	(
		<View style={styles.mainView}>
			<UserProfile />
			<LogOutButton navigation={navigation} />      
		</View>
	)

export default AccountScreen
