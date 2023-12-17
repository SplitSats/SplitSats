import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const RefreshIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default RefreshIndicator;
