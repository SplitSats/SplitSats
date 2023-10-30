import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SECONDARY_COLOR, DARK_GREY } from '@styles/styles';


const TextInputWithDescription = ({ description, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.description}>{description}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    height: 40,	
    marginBottom: 40,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  textInput: {
    width: '100%',
    height: 40,	
    backgroundColor: DARK_GREY, // Gray background color
    color: 'white',
    borderWidth: 2,
    borderColor: SECONDARY_COLOR, // Replace with your secondary color
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default TextInputWithDescription;
