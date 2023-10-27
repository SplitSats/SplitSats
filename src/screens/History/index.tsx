import React, { useEffect } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'

import { styles } from '@styles/styles'
import UserProfile from '@comps/account/UserProfile'

const HistoryScreen = ({ navigation }) => (
	<View style={styles.mainView}>
      
		<UserProfile />
      
		{/* User's groups list */}
		<View style={styles.groupsList}>
			{/* List of user's groups */}
			<Text style={styles.header}>History</Text>
		</View>
	</View>
)

export default HistoryScreen
