// Navigation.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { View } from 'react-native'

import GroupsScreen from '@screens/Groups'
import ContactsScreen from '@screens/Contacts'
import AccountScreen from '@screens/Account'
import HistoryScreen from '@screens/History'
import TabBarIcon from '@comps/nav/TabBarIcon'
import { BottomNavigation, BottomNavigationTab, Icon, Divider } from "@ui-kitten/components"

// Import your icon components
const { Navigator, Screen } = createBottomTabNavigator()

function BottomTabBar({ navigation, state }) {
	return (
	  <>
		<Divider />
		<BottomNavigation
		  appearance="noIndicator"
		  selectedIndex={state.index}
		  onSelect={(index) => navigation.navigate(state.routeNames[index])}
		>
		  <BottomNavigationTab icon={(props) => <Icon {...props} name="home-outline" />} />
		  <BottomNavigationTab icon={(props) => <Icon {...props} name="bell-outline" />} />
		  <BottomNavigationTab icon={(props) => <Icon {...props} name="settings-outline" />} />
		  <BottomNavigationTab icon={(props) => <Icon {...props} name="history" />} />
		</BottomNavigation>
	  </>
	)
  }
  export function BottomTabNavigator() {
	return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>

		<Screen name="Groups" component={GroupsScreen} />
		<Screen name="Friends" component={ContactsScreen} />
		<Screen name="History" component={HistoryScreen} />
		<Screen name="Account" component={AccountScreen} />
	  </Navigator>
	);
  }
  
