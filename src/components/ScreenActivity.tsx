import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '../styles/styles'
import UserProfile from './account/UserProfile'
import LogOutButton from './ButtonLogOut'

const ScreenActivity = ({ navigation }) => (
	<View style={styles.mainView}>
      
		<UserProfile />
      
		{/* User's groups list */}
		<View style={styles.groupsList}>
			{/* List of user's groups */}
		</View>
		<LogOutButton navigation={navigation} />
	</View>
)

export default ScreenActivity
