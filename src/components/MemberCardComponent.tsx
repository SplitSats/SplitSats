import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DARK_GREY } from "@styles/styles";

const MemberCardComponent: React.FC<User> = ({ name, profileImage }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_GREY,
    borderRadius: 20,
    padding: 8,
    margin: 5,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MemberCardComponent;
