import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {styles} from '../styles/styles';


const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading for 1-2 seconds, then navigate to the home screen
    setTimeout(() => {
      // Check if the user is authenticated, and navigate accordingly
      // Replace the 'loggedIn' check with your authentication logic
      const loggedIn = false; // Example
      if (loggedIn) {
        navigation.replace('Home');
      } else {
        navigation.replace('Authentication');
      }
    }, 2000); // 2 seconds
  }, []);

  return (
    <View style={styles.mainView}>
      <Image source={require('../assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
    </View>
  );
};

export default LoadingScreen;
