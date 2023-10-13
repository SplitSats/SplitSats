import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Navigation bar with options */}
      <View style={styles.navigationBar}>
        <Text style={styles.option}>Groups</Text>
        <Text style={styles.option}>Friends</Text>
        <Text style={styles.option}>History</Text>
      </View>
      
      {/* User info section */}
      <View style={styles.userInfo}>
        <Image source={require('../assets/icon.png')} style={styles.userPhoto} />
        <Text style={styles.welcome}>Welcome, User's Name</Text>
      </View>
      
      {/* User's groups list */}
      <View style={styles.groupsList}>
        {/* List of user's groups */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
  },
  option: {
    margin: 10,
  },
  userInfo: {
    alignItems: 'center',
  },
  userPhoto: {
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupsList: {
    flex: 1,
    // Add styles for the list of user's groups
  },
});

export default HomeScreen;
