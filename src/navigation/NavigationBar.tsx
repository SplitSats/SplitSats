import SvgUri from 'expo-svg-uri'
import React from 'react'
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native'

const NavigationBar = ({ navigation }) => (
	<View style={styles.navigationBar}>
		<TouchableOpacity onPress={() => navigation.navigate('Groups')}>
			<SvgUri width="20" height="20" source={require('../assets/icon/lightning.svg')} />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate('Friends')}>
			<SvgUri width="20" height="20" source={require('../assets/icon/lightning.svg')} />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
			<View style={styles.addButton}>
				<SvgUri width="20" height="20" source={require('../assets/icon/lightning.svg')} />
			</View>
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate('Activity')}>
			<SvgUri width="20" height="20" source={require('../assets/icon/lightning.svg')} />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate('Account')}>
			<SvgUri width="20" height="20" source={require('../assets/icon/lightning.svg')} />
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	navigationBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#2196F3',
		paddingVertical: 10,
	},
	icon: {
		color: 'white',
	},
	addButton: {
		backgroundColor: 'white',
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
	},
})

export default NavigationBar
