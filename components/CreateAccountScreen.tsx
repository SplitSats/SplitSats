import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountScreen = ({ navigation }) => {
  const { setUserIsLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleCreateAccount = async () => {
    // Generate a private key for the user
    const userPrivateKey = generatePrivateKey();
    // Extract the public key from the private key
    const userPublicKey = getPublicKey(userPrivateKey);
    console.log('userPrivateKey:', userPrivateKey);
    console.log('userPublicKey:', userPublicKey);
    // In a real app, you would associate the user's public key and username
    // with their account on the server.
    
    // Store the private key securely, such as in AsyncStorage
    await AsyncStorage.setItem('userPrivateKey', userPrivateKey);
    await AsyncStorage.setItem('userPublicKey', userPublicKey);

    // Store the public key on the server, and username if needed

    // Set the user as logged in
    await AsyncStorage.setItem('userIsLoggedIn', 'true');
    setUserIsLoggedIn(true);

    // Navigate to the HomeScreen
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Create Account" onPress={handleCreateAccount} />
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

export default CreateAccountScreen;
