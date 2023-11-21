import React from 'react'
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'

const AuthButton = ({ label, description, onPress }) => (
	<View style={styles.buttonContent}>
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<View>
				<Text style={styles.buttonText}>{label}</Text>
				<Text style={styles.descriptionText}>{description}</Text>
			</View>
		</TouchableOpacity>
	</View>
)


export default AuthButton


const styles = StyleSheet.create({
	buttonContent: {
	  width: '100%', // Make the content width full
	  marginBottom: 30, // Add vertical padding between AuthButton components
	},
	button: {
	  width: '100%', // Make the button width full
	  backgroundColor: PRIMARY_COLOR, // Replace with your primary color
	  borderRadius: 10,
	  padding: 20,
	  paddingVertical: 20, // Vertical padding
	  paddingHorizontal: 10, // Horizontal padding
	  marginHorizontal: 0, // Padding at the edges 
	  borderWidth: 2,
	  borderColor: SECONDARY_COLOR, // Replace with your secondary color
	  alignItems: 'flex-start', // Align text to the left
	},
	buttonText: {
	  color: 'white',
	  textTransform: 'uppercase',
	  fontWeight: 'bold',
	  fontSize: 18,
	  marginLeft: 10, // Adjust the left margin
	},
	descriptionText: {
	  color: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
	  fontSize: 14,
	  marginLeft: 10, // Adjust the left margin
	},
});
  