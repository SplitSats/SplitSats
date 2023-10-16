import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Import the necessary components

const AddImageButton = ({ label, svg, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.background}>
        {/* <SvgXml xml={svg} width="100%" height="100%" /> */}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: 80,
    height: 80,
    backgroundColor: 'light gray', // Replace with your desired background color
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 20,
    fontSize: 16,
  },
});

export default AddImageButton;
