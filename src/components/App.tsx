import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,Text, View } from 'react-native'

import  CreateAccountScreen from '@screens/Account/CreateAccount'
import AuthenticationScreen from '@screens/Auth/Authentication'
import LoadingScreen from '@screens/Loading'
import LogInScreen from '@screens/Auth/LogIn'
import { AuthProvider } from '@src/context/AuthContext'
import { NDKProvider } from '@src/context/NDKContext'
import GroupsScreen from '@screens/Groups'
import ContactsScreen from '@screens/Contacts'
import AccountScreen from '@screens/Account'
import HistoryScreen from '@screens/History'
import ConfirmCreateAccountScreen from '@screens/Account/ConfirmCreateAccount'

const Stack = createNativeStackNavigator()

export default function App() {
  
	return (
		<NavigationContainer>
			<NDKProvider>
				<AuthProvider> 
					<Stack.Navigator initialRouteName="Loading">
						<Stack.Screen name="Loading" component={LoadingScreen} />
						<Stack.Screen name="Authentication" component={AuthenticationScreen} />
						<Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
						<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} /> 
						<Stack.Screen name="LogIn" component={LogInScreen} /> 
						<Stack.Screen name="Groups" component={GroupsScreen} />
						<Stack.Screen name="Contacts" component={ContactsScreen} />
						<Stack.Screen name="History" component={HistoryScreen} />
						<Stack.Screen name="Account" component={AccountScreen} />
					</Stack.Navigator>
				</AuthProvider>
			</NDKProvider>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
	},
})
