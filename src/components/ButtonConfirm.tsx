import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, Keyboard, Platform  } from 'react-native';
import { SECONDARY_COLOR } from '@styles/styles';


const ButtonConfirm = ({ title, onPress, disabled }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton, keyboardVisible && styles.keyboardVisible]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR, // Background color of the button
    width: '80%',
    height: 50,
    alignSelf: 'center',
    overflow: 'hidden',
    bottom: 30,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    color: 'black', // Text color
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  },
  disabledButton: {
    backgroundColor: '#ccc', // You can change the color when the button is disabled
  },
  disabledText: {
    color: '#999', // You can change the text color when the button is disabled
  },
  keyboardVisible: {
    bottom: 0, // Move the button to the bottom when keyboard is visible on Android
  },
});

export default ButtonConfirm;
