import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,Text, View, SafeAreaView } from 'react-native'

import  CreateAccountScreen from '@screens/Account/CreateAccount'
import AuthenticationScreen from '@screens/Auth/Authentication'
import LoadingScreen from '@screens/Loading'
import LogInScreen from '@screens/Auth/LogIn'
import ConfirmCreateAccountScreen from '@screens/Account/ConfirmCreateAccount'
import FinalConfirmation from '@screens/Account/FinalConfirmation'
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import { PRIMARY_COLOR } from '@src/styles/colors'
import PolyfillCrypto from "react-native-webview-crypto";
import Navigation from '@src/navigation/MyBottomTabNavigation'
import CreateNewGroup from '@screens/Groups/CreateNewGroup'
import AddFriendScreen from '@screens/Account/AddFriendsScreen'


const Stack = createNativeStackNavigator()

export default function App() {
	
	return (
	  <View style={{ flex: 1, backgroundColor: "080808" }}>
	    <SafeAreaProvider>
		<PolyfillCrypto />
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Loading">
					<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
					<Stack.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false }}/>
					<Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }}/> 
					<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} options={{ headerShown: false }}/> 
					<Stack.Screen name="FinalConfirmation" component={FinalConfirmation} options={{ headerShown: false }}/>
					<Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }}/> 
					<Stack.Screen name="AddFriend" component={AddFriendScreen} options={{ headerShown: false }}/>
					<Stack.Screen
						name="Dashboard"
						component={Navigation}
						options={{ headerShown: false }} // Usually, you hide the header for the bottom tab navigator
						/>

					<Stack.Screen name="CreateGroup" component={CreateNewGroup}/>
					
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	  </View>
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
