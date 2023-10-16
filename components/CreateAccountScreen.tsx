import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../styles/styles';
import AddImageButton from './AddImageButton';
import { nip19 } from 'nostr-tools';

const CreateAccountScreen = ({ navigation }) => {
  const { setUserIsLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleCreateAccount = async () => {
    // Generate a private key for the user
    const userPrivateKey = generatePrivateKey();  
    const nsec = nip19.nsecEncode(userPrivateKey);
    // Extract the public key from the private key
    const userPublicKey = getPublicKey(userPrivateKey);
    const npub = nip19.npubEncode(userPublicKey);
    console.log('userPrivateKey:', nsec);
    console.log('userPublicKey:', npub);
    // In a real app, you would associate the user's public key and username
    // with their account on the server.
    
    // Store the private key securely, such as in AsyncStorage
    await AsyncStorage.setItem('userPrivateKey', userPrivateKey);
    await AsyncStorage.setItem('userPublicKey', userPublicKey);

    // Set the user as logged in
    await AsyncStorage.setItem('userIsLoggedIn', 'true');
    setUserIsLoggedIn(true);

    // Navigate to the HomeScreen
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEW ACCOUNT</Text>
      <View style={styles.photoContainer}>
      <AddImageButton
        label="Add Photo"
        svg={require('../assets/icon/camera-upload.svg')} // Provide the path to your SVG
        onPress={() => {}}
      />

      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput style={styles.input} placeholder="Display Name" />
      <TextInput style={styles.input} placeholder="LN Address" />
      <TextInput style={styles.input} placeholder="NIP05" />
      <Button title="Create Account" style={styles.createAccountButton} onPress={handleCreateAccount} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  photoContainer: {
    marginBottom: 20,
  },
  photoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'light gray', // Replace with your desired background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    color: 'white',
    borderWidth: 2,
    borderColor: SECONDARY_COLOR, // Replace with your secondary color
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  createAccountButton: {
    backgroundColor: SECONDARY_COLOR, // Replace with your secondary color
    color: 'white',
    borderRadius: 10,
  },
});

export default CreateAccountScreen;
