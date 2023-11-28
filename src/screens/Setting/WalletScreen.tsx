
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConfirmButton from '@comps/ConfirmButton'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
const WalletConnectScreen = () => {
    const handleConnectButton = () => {
        console.log('Handle the function');
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Connect Your Wallet</Text>
        <Text style={styles.description}>
          Thanks to Nostr Wallet Connect (NWC) you can connect your Lightning Wallet
          to SplitSats to pay your friends without leaving the app! ⚡
        </Text>
        <Text style={styles.description}>
          You can always disconnect it at any time.
        </Text>
        <ConfirmButton title="CONNECT YOUR WALLET" onPress={handleConnectButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Assuming the background is black
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24, // Adjust the padding as needed
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16, // Adjust the margin as needed
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16, // Adjust the margin as needed
    textAlign: 'center',
  },
});

export default WalletConnectScreen;
