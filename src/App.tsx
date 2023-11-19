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
// import { Provider, useSelector } from "react-redux"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
// import { store, persistor } from "@store"
// import { PersistGate } from "redux-persist/integration/react"
// import { StatusBar, KeyboardAvoidingView } from "react-native"
import { PRIMARY_COLOR } from '@src/styles/colors'
import PolyfillCrypto from "react-native-webview-crypto";
import Navigation from '@src/navigation/MyBottomTabNavigation'
import CreateNewGroup from '@screens/Groups/CreateNewGroup'
import AddFriendScreen from '@screens/Account/AddFriendsScreen'


const Stack = createNativeStackNavigator()

export default function App() {
	
	return (
	  <View style={{ flex: 1, backgroundColor: "080808" }}>
        {/* <Provider > */}
	    <SafeAreaProvider>
		<PolyfillCrypto />
		<AuthProvider> 
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Loading">
					<Stack.Screen name="Loading" component={LoadingScreen} />
					<Stack.Screen name="Authentication" component={AuthenticationScreen} />
					<Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
					<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} /> 
					<Stack.Screen name="FinalConfirmation" component={FinalConfirmation}/>
					<Stack.Screen name="LogIn" component={LogInScreen} /> 
					<Stack.Screen name="AddFriend" component={AddFriendScreen}/>
					<Stack.Screen
						name="Dashboard"
						component={Navigation}
						options={{ headerShown: false }} // Usually, you hide the header for the bottom tab navigator
						/>

					<Stack.Screen name="CreateGroup" component={CreateNewGroup}/>
					
				</Stack.Navigator>
			</NavigationContainer>

		</AuthProvider>
		</SafeAreaProvider>
		{/* </Provider> */}
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
