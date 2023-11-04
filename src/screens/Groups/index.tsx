import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '@styles/styles'
import UserProfile from '@comps/account/UserProfile'
import Navigation from '@src/navigation/MyBottomTabNavigation'


const GroupsScreen = ({ navigation }) => (
	<View style={styles.mainView}>
      
		<UserProfile dataStore={'store'}/>

	{/* <Navigation /> */}

	</View>


)

export default GroupsScreen
