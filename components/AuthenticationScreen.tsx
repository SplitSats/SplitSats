import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../styles/styles';
import AuthButton from './AuthButton';

const AuthenticationScreen = ({ navigation }) => {
  useEffect(() => {
    // Check if the user is logged in by reading a value from AsyncStorage
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userIsLoggedIn');
      if (userLoggedIn && userLoggedIn === 'true') {
        console.log('User logged in');
        navigation.navigate('Home');
      } else {
        console.log('User not logged in');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo/Splitsats-nobg_W.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonsContainer}>
        <AuthButton
          label="Create Account"
          description="Your new account will be ready in seconds."
          onPress={() => navigation.navigate('CreateAccount')}
        />
        <AuthButton
          label="Log In"
          description="Sign in using your Nostr Key!"
          onPress={() => navigation.navigate('LogIn')}
        />
      </View>
    </View>
  );
};

export default AuthenticationScreen;
