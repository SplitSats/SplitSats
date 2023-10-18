import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './UserProfile';
import LogOutButton from './LogOutButton';
import { styles } from '../styles/styles';

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
    <View style={styles.mainView}>
      
      <UserProfile />
      
      {/* User's groups list */}
      <View style={styles.groupsList}>
        {/* List of user's groups */}
      </View>
      <LogOutButton navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
