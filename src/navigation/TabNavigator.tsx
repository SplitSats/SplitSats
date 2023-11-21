import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomNavigation, BottomNavigationTab, Icon, Divider } from "@ui-kitten/components"

import GroupsScreen from '@screens/Groups'
import ContactsScreen from '@screens/Contacts'
import AccountScreen from '@screens/Account'


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
      </BottomNavigation>
    </>
  )
}

export function BottomTabNavigator() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Screen name="Contacts" component={ContactsScreen} />
      <Screen name="Groups" component={GroupsScreen} />
      <Screen name="Account" component={AccountScreen} />
    </Navigator>
  )
}
