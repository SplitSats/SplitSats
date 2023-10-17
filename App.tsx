import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import GroupCreation from './components/GroupCreation'; // Import the GroupCreation component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NDKProvider } from './context/NDKContext';
import HomeScreen from './components/HomeScreen';
import AuthenticationScreen from './components/AuthenticationScreen';
import LoadingScreen from './components/LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './components/LogInScreen';
import  CreateAccountScreen from './components/CreateAccountScreen';
import { AuthProvider } from './context/AuthContext';
import MyBottomTabNavigation from './navigation/MyBottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreateGroup = (users) => {
    // Handle the group creation logic using the selected users
    console.log('Creating group with users:', users);
  };
 
  return (
    <NavigationContainer>
    {/* <MyBottomTabNavigation /> */}
    <AuthProvider> 
    <NDKProvider>
      
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
        <Stack.Screen name="LogIn" component={LogInScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NDKProvider>
    </AuthProvider>
    
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
    
  );
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
});
