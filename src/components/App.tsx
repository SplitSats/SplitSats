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
import { BottomTabNavigator } from '@src/navigation/BottomTabNavigation'
import { Provider, useSelector } from "react-redux"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import { store, persistor } from "@store"
import { PersistGate } from "redux-persist/integration/react"
import { StatusBar, KeyboardAvoidingView } from "react-native"
import { PRIMARY_COLOR } from '@src/styles/colors'


const Stack = createNativeStackNavigator()


function AppWrapper({ children }) {
	const insets = useSafeAreaInsets()
	const backgroundColor: string = PRIMARY_COLOR
  
	return (
	  <PersistGate loading={<View style={{ flex: 1, backgroundColor }} />} persistor={persistor}>
		<View style={{ flex: 1, backgroundColor, paddingTop: insets.top, paddingBottom: insets.bottom }}>
		  <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
			{children}
		  </KeyboardAvoidingView>
		</View>
	  </PersistGate>
	)
  }

export default function App() {
	
	return (
	  <View style={{ flex: 1, backgroundColor: "080808" }}>
        <Provider store={store}>
	    <SafeAreaProvider>
		<NDKProvider>
		<AuthProvider> 
		<AppWrapper>

			<NavigationContainer>
				<Stack.Navigator initialRouteName="Loading">
					<Stack.Screen name="Loading" component={LoadingScreen} />
					<Stack.Screen name="Authentication" component={AuthenticationScreen} />
					<Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
					<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} /> 
					<Stack.Screen name="FinalConfirmation" component={FinalConfirmation}/>
					<Stack.Screen name="LogIn" component={LogInScreen} /> 
					<Stack.Screen name="Groups" component={GroupsScreen} />
					<Stack.Screen name="Contacts" component={ContactsScreen} />
					<Stack.Screen name="History" component={HistoryScreen} />
					<Stack.Screen name="Account" component={AccountScreen} /> 
				</Stack.Navigator>
			</NavigationContainer>
		</AppWrapper>
		</AuthProvider>
		</NDKProvider>
		</SafeAreaProvider>
		</Provider>
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
