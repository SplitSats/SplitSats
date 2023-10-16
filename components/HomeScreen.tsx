import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './UserProfile';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Clear the user session data from AsyncStorage
    try {
      await AsyncStorage.removeItem('userIsLoggedIn');
      await AsyncStorage.removeItem('userPrivateKey')
      await AsyncStorage.removeItem('userPublicKey')
      // Navigate back to the Authentication screen
      navigation.navigate('Authentication');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* User info section */}
      {/* <UserProfile /> */}
      <View style={styles.userInfo}>
        <Image source={require('../assets/icon.png')} style={styles.userPhoto} />
        <Text style={styles.welcome}>Welcome, User's Name</Text>
      </View>
      
      {/* User's groups list */}
      <View style={styles.groupsList}>
        {/* List of user's groups */}
      </View>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
  },
  option: {
    margin: 10,
  },
  userInfo: {
    alignItems: 'center',
  },
  userPhoto: {
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupsList: {
    flex: 1,
    // Add styles for the list of user's groups
  },
});

export default HomeScreen;
