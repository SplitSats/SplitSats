import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,Text, View, SafeAreaView } from 'react-native'

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
import FinalConfirmation from '@screens/Account/FinalConfirmation'
import AddFriendScreen from '@screens/Account/AddFriendsScreen'
import Navigation from '@src/navigation/MyBottomTabNavigation'


const Stack = createNativeStackNavigator()

export default function App() {
  
	return (
		<NavigationContainer>
			<NDKProvider>
				<AuthProvider> 
					{/* <SafeAreaView style={styles.safeContainer}> */}
						<Stack.Navigator initialRouteName="Loading">
							<Stack.Screen name="Loading" component={LoadingScreen} />
							<Stack.Screen name="Authentication" component={AuthenticationScreen} />
							<Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
							<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} /> 
							<Stack.Screen name="FinalConfirmation" component={FinalConfirmation}/>
							<Stack.Screen name="LogIn" component={LogInScreen} /> 
							<Stack.Screen name="AddFriend" component={AddFriendScreen}/>
							<Stack.Screen
								name="Groups"
								component={Navigation}
								options={{ headerShown: false }} // Usually, you hide the header for the bottom tab navigator
								/>
							{/* <Stack.Screen name="Groups" component={GroupsScreen} />
							<Stack.Screen name="Contacts" component={ContactsScreen} />
							<Stack.Screen name="History" component={HistoryScreen} />
							<Stack.Screen name="Account" component={AccountScreen} /> 
							<Stack.Screen
								name="MainApp"
								component={Navigation}
								options={{ headerShown: false }} // Usually, you hide the header for the bottom tab navigator
								/> */}
						</Stack.Navigator>
					{/* </SafeAreaView> */}
				</AuthProvider>
			</NDKProvider>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1
	},
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
