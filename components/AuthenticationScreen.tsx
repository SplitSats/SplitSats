import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import {styles} from '../styles/styles';
import AuthButton from './AuthButton';

const AuthenticationScreen = ({ navigation }) => {
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
          description="Sign using your Nostr Key!"
          onPress={() => navigation.navigate('LogIn')}
        />
      </View>
    </View>
  );
};


export default AuthenticationScreen;
