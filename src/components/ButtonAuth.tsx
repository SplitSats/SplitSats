import React from 'react'
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native'

import { styles } from '../styles/styles'

const AuthButton = ({ label, description, onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<View style={styles.buttonContent}>
			<Text style={styles.buttonText}>{label}</Text>
			<Text style={styles.descriptionText}>{description}</Text>
		</View>
	</TouchableOpacity>
)


export default AuthButton
