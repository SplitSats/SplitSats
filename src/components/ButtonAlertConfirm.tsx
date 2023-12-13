import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";

const AlertConfirmButton = ({ onPress, buttonText }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.alertButton}>
        <Text style={styles.alertText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButton: {
    backgroundColor: 'PRIMARY_COLOR', // Replace 'PRIMARY_COLOR' with your color variable
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  alertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
  },
});

export default AlertConfirmButton;
