import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

const AuthButton = ({ label, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{label}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
  </TouchableOpacity>
  );
};


export default AuthButton;
