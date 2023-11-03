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

// Import your icon components
const Tab = createBottomTabNavigator()

const Navigation = () => (
	<Tab.Navigator>
		<Tab.Screen
			name="Groups"
			component={GroupsScreen}
			options={{
				tabBarIcon: ({ focused }) => (
				  <TabBarIcon name="lightning" focused={focused}/>
				),
			}}
		/>
		<Tab.Screen
			name="Friends"
			component={ContactsScreen}
			options={{
				tabBarIcon: ({ focused }) => (
				  <TabBarIcon name="lightning" focused={focused}/>
				),
			}}
		/>
		<Tab.Screen
			name="Account"
			component={AccountScreen}
			options={{
				tabBarIcon: ({ focused }) => (
				  <TabBarIcon name="lightning" focused={focused}/>
				),
			}}
		/>

		<Tab.Screen
			name="History"
			component={HistoryScreen}
			options={{
				tabBarIcon: ({ focused }) => (
				  <TabBarIcon name="lightning" focused={focused}/>
				),
			}}
		/>

	</Tab.Navigator>
)

export default Navigation
