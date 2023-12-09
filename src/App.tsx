import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,Text, View, SafeAreaView, Platform, StatusBar } from 'react-native'

import  CreateAccountScreen from '@screens/Account/CreateAccount'
import AuthenticationScreen from '@screens/Auth/Authentication'
import LoadingScreen from '@screens/Loading'
import LogInScreen from '@screens/Auth/LogIn'
import ConfirmCreateAccountScreen from '@screens/Account/ConfirmCreateAccount'
import LightningAddressScreen from '@screens/Account/LightningAddress'
import FinalConfirmation from '@screens/Account/FinalConfirmation'
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"
import { PRIMARY_COLOR } from '@src/styles/colors'
import PolyfillCrypto from "react-native-webview-crypto";
import Navigation from '@src/navigation/BottomTabNavigation'
import CreateNewGroup from '@screens/Groups/CreateNewGroup'
import AddFriendScreen from '@screens/Contacts/AddFriendsScreen'
import { NDKProvider } from './context/NDKContext'
import ProfileSettingScreen from '@screens/Setting/ProfileSettingScreen'
import WalletConnectScreen from '@screens/Setting/WalletScreen'
import KeysScreen from '@screens/Setting/KeysScreen'
import PreferencesScreen from '@screens/Setting/PreferencesScreen'
import DonateScreen from '@screens/Setting/DonateScreen'
import UserProfile from '@comps/account/UserProfile'
import WebViewScreen from '@src/components/WebViewScreen';
import NostrWalletConnectScreen from '@screens/Setting/NostrWalletConnect';
import { NWCProvider } from '@src/context/NWCContext'
// import "../applyGlobalPolyfills";
import { setupURLHandler } from '@src/util/DeepLinkService'; // Replace with the correct path

const Stack = createNativeStackNavigator()

export default function App() {
	// useEffect(() => {
	// 	const cleanupURLHandler = setupURLHandler();
	// 	return cleanupURLHandler;
	// }, []);

	return (
	  <View style={{ flex: 1, backgroundColor: "080808" }}>
	    <SafeAreaProvider>
		<PolyfillCrypto />
		<NDKProvider>
		<NWCProvider>
			<NavigationContainer>
				<Stack.Navigator 
					initialRouteName="Loading"
					screenOptions={{
						headerShown: false, // Default headerShown to false for all screens
					}}
				>
					<Stack.Screen name="Loading" component={LoadingScreen} />
					<Stack.Screen name="Authentication" component={AuthenticationScreen} />
					<Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
					<Stack.Screen name="ConfirmCreateAccount" component={ConfirmCreateAccountScreen} />
					<Stack.Screen name="FinalConfirmation" component={FinalConfirmation} />
					<Stack.Screen name="LogIn" component={LogInScreen} />
					<Stack.Screen name="AddFriend" component={AddFriendScreen} />
					<Stack.Screen name="Dashboard" component={Navigation}/>
					<Stack.Screen name="CreateNewGroup" component={CreateNewGroup} />
					<Stack.Screen name="ProfileSetting" component={ProfileSettingScreen}/>
					<Stack.Screen name="WalletScreen" component={WalletConnectScreen}/>
					<Stack.Screen name="LightningAddressScreen" component={LightningAddressScreen}/>
					<Stack.Screen name="KeysScreen" component={KeysScreen}/>
					<Stack.Screen name="PreferencesScreen" component={PreferencesScreen}/>
					<Stack.Screen name="DonateScreen" component={DonateScreen}/>
					<Stack.Screen name="UserProfile" component={UserProfile}/>
					<Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
					<Stack.Screen name="NostrWalletConnect" component={NostrWalletConnectScreen}/>

				</Stack.Navigator>
			</NavigationContainer>
		</NWCProvider>
		</NDKProvider>
		</SafeAreaProvider>
	  </View>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for Android status bar
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
