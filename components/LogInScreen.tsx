import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const LogInScreen = ({ navigation }) => {
  const { setUserIsLoggedIn } = useAuth();
  const [privateKey, setPrivateKey] = useState('');

  const handleLogIn = async () => {
    // Perform user authentication logic using the provided private key

    // After successful authentication, set the user as logged in
    await AsyncStorage.setItem('userIsLoggedIn', 'true');
    setUserIsLoggedIn(true);

    // Navigate to the HomeScreen
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <Button title="Log In" onPress={handleLogIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
});

export default LogInScreen;
