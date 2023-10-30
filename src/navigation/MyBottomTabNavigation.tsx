// Navigation.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { View } from 'react-native'

import GroupsScreen from '@screens/Groups'
import ContactsScreen from '@screens/Contacts'
import AccountScreen from '@screens/Account'
import HistoryScreen from '@screens/History'


// Import your icon components
const Tab = createBottomTabNavigator()

const Navigation = () => (
	<Tab.Navigator>
		<Tab.Screen
			name="Groups"
			component={GroupsScreen}
			options={{
				tabBarIcon: () => (
					// Add your Groups icon component here
					// <GroupIcon />
					<View style={{width: 24, height: 24, backgroundColor: 'red'}} />
				),
			}}
		/>
		<Tab.Screen
			name="Friends"
			component={ContactsScreen}
			options={{
				tabBarIcon: () => (
					// Add your Friends icon component here
					<View style={{width: 24, height: 24, backgroundColor: 'red'}} />

				),
			}}
		/>
		<Tab.Screen
			name="Account"
			component={AccountScreen}
			options={{
				tabBarIcon: () => (
					// Add your History icon component here
					<View style={{width: 24, height: 24, backgroundColor: 'red'}} />
				),
			}}
		/>

		<Tab.Screen
			name="History"
			component={HistoryScreen}
			options={{
				tabBarIcon: () => (
					// Add your History icon component here
					<View style={{width: 24, height: 24, backgroundColor: 'red'}} />
				),
			}}
		/>

	</Tab.Navigator>
)

export default Navigation
