import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, DARK_GREY } from '@styles/styles';


const TextInputWithDescription = ({ description, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{description}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
    }, 
    label: {
        alignSelf: 'flex-start',  // Aligns text to the left
        marginLeft: '10%',
        color: '#B0B0B0',
        marginBottom: 8,  // Adjust as per spacing required between label and input
    },
    input: {
        width: '80%',
        height: 40,
        color: 'white',
        backgroundColor: '#333A4A',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
});

export default TextInputWithDescription;
