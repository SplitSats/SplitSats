import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,Text, View } from 'react-native'

import  CreateAccountScreen from './CreateAccount'
import HomeScreen from './ScreenAccount'
import AuthenticationScreen from './ScreenAuthentication'
import LoadingScreen from './ScreenLoading'
import LogInScreen from './ScreenLogIn'
import { AuthProvider } from '../context/AuthContext'
import { NDKProvider } from '../context/NDKContext'
import MyBottomTabNavigation from '../navigation/MyBottomTabNavigation'

const Stack = createNativeStackNavigator()

export default function App() {
  
	return (
		<NavigationContainer>
			{/* <MyBottomTabNavigation /> */}
			<NDKProvider>
				<AuthProvider> 
      
					<Stack.Navigator initialRouteName="Loading">
						<Stack.Screen name="Loading" component={LoadingScreen} />
						<Stack.Screen name="Authentication" component={AuthenticationScreen} />
						<Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
						<Stack.Screen name="LogIn" component={LogInScreen} /> 
						<Stack.Screen name="Groups" component={GroupsScreen} />
						<Stack.Screen name="Contacts" component={ContactsScreen} />
						<Stack.Screen name="Activity" component={ActivityScreen} />
						<Stack.Screen name="Account" component={AccountScreen} />
					</Stack.Navigator>
				</AuthProvider>
			</NDKProvider>
    
			{/* <NDKProvider>
    
      <View style={styles.container}>
        <UserProfile />
        <StatusBar style="auto" />
        <Button title="Create Group" onPress={toggleModal} />
        <Text>Selected Users: {selectedUsers.join(", ")}</Text>
        <GroupCreation
          isVisible={isModalVisible}
          onClose={toggleModal}
          onCreateGroup={handleCreateGroup}
          setSelectedUsers={setSelectedUsers}
        />
      </View>
    </NDKProvider> */}
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
