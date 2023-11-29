import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '@styles/styles'
import UserProfile from '@comps/account/UserProfile'
import LogOutButton from '@comps/ButtonLogOut'

const ContactScreen = ({ navigation }) => (
	<View style={styles.mainView}>
      
		<UserProfile />
      
		{/* User's groups list */}
		<View style={styles.groupsList}>
			{/* List of user's groups */}
		</View>
		<LogOutButton navigation={navigation} />
	</View>
)

export default ContactScreen