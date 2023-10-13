import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import GroupCreation from './components/GroupCreation'; // Import the GroupCreation component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NDKProvider } from './context/NDKContext';
import UserProfile from './components/UserProfile';
import HomeScreen from './components/HomeScreen';
import AuthenticationScreen from './components/AuthenticationScreen';
import LoadingScreen from './components/LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './components/LogInScreen';
import  CreateAccountScreen from './components/CreateAccountScreen';
import { AuthProvider } from './context/AuthContext';

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
 
  useEffect(() => {
    // Load cached contacts when the app starts
    const loadCachedContacts = async () => {
      try {
        let cachedContacts = await AsyncStorage.getItem('cachedContacts');
        if (cachedContacts !== null) {
          // Get contacts from Nostr using getNostrContacts
          const loadedContacts = await getNostrContacts();
          // Set contacts to the AsyncStorage
          cacheContacts(loadedContacts);
        }
        else {
          cachedContacts = [];
        }
      } catch (error) {
        console.error('Error loading cached contacts:', error);
      }
    };
    loadCachedContacts();
  }, []);

  const getNostrContacts = async () => {
    const follows = await user.follows();
    const loadedContacts = [];
  
    for (const follow of follows) {
      // This loop could be slow 
      if (follow.profile) {
        await follow.fetchProfile();
        loadedContacts.push(follow.profile?.name || follow.npub);
      } else {
        loadedContacts.push(follow.npub);
      }
    }
  };

  const cacheContacts = async (contacts) => {
    try {
      // Stringify the contacts and store them in AsyncStorage
      const contactsJSON = JSON.stringify(contacts);
      await AsyncStorage.setItem('cachedContacts', contactsJSON);
    } catch (error) {
      console.error('Error caching contacts:', error);
    }
  };
  if(!cacheContacts){
    return null;
  }
  return (
    <NavigationContainer>
    <AuthProvider>

      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> 
        <Stack.Screen name="LogIn" component={LogInScreen} /> 
      
      </Stack.Navigator>
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
