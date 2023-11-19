import { StyleSheet } from 'react-native'


export const PRIMARY_COLOR = '#0F172A'
export const SECONDARY_COLOR = '#83A3EE'
export const DARK_GREY = '#2B2B2B'
export const FILL_CARD_COLOR = '#303444'
export const SOFT_GREY = '#D9D9D9'



export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	mainView: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: PRIMARY_COLOR,
		justifyContent: 'center',
	},
	logo: {
		width: 200,
		height: 200,
	},
	logoContainer: {
		marginBottom: 20,
		marginTop: 20, // Increase the top margin to move the logo higher
	},
	appLogo: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonsContainer: {
		width: '80%',
		marginTop: 20, // Increase the top margin to space out the buttons
		padding: 20,
	},

	button: {
		backgroundColor: PRIMARY_COLOR, // Replace with your primary color
		borderRadius: 10,
		padding: 20,
		paddingVertical: 15, // Vertical padding
		paddingHorizontal: 20, // Horizontal padding
		marginHorizontal: 10, // Padding at the edges 
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
    
	buttonContent: {
		width: '100%', // Make the content width full
	},
    
	descriptionText: {
		color: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
		fontSize: 14,
		marginLeft: 10, // Adjust the left margin
	},
})