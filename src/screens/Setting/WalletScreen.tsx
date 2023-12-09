
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConfirmButton from '@comps/ConfirmButton'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import Header from "@comps/Header";
import { useNWCContext, useConnectWithAlby, useNwcUrl, useNWCEnable } from '@src/context/NWCContext';
import WebView from 'react-native-webview';
import { err, l } from '@log';
import WebViewScreen  from '@src/components/WebViewScreen';
import { webln } from "@getalby/sdk";
import { useFocusEffect } from '@react-navigation/native';


const WalletConnectScreen = ({ navigation }) => {
  
  const [
    connectWithAlby,
    nwcUrl,
    pendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
    setNwcUrl,
  ] = useConnectWithAlby();
  const {isLoading, isError, error, webln } = useNWCEnable();

  const [balance, setBalance] = useState<number | undefined>();
  const [webLNEnable, setWebLNEnable] = useState<boolean>(false);

  const { nostrWebLN } = useNWCContext();

  const handleBack = () => {
    navigation.goBack();
  }

  const navigateToWebView = async () => {
    await connectWithAlby();
    if (nwcAuthUrl) {
      navigation.navigate('WebViewScreen');
    } 
  };

  useEffect(() => {
  const handleWebLN = async () => {
    l('nwcUrl:', nwcUrl);
    l('pendingNwcUrl:', pendingNwcUrl);
    l('nwcAuthUrl:', nwcAuthUrl);
    l('nostrWebLN:', nostrWebLN);
  };
  handleWebLN();
  }, [nwcUrl, pendingNwcUrl, nwcAuthUrl]);

  const handleConnectButton = async () => {
    navigation.navigate('NostrWalletConnect');
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="NOSTR WALLET CONNECT" onPressBack={handleBack} />
      <View style={styles.contentContainer}>
        {!nwcUrl && (
          <>
            <Text style={styles.title}>Connect Your Wallet</Text>
            <Text style={styles.description}>
              Thanks to Nostr Wallet Connect (NWC) you can connect your Lightning Wallet
              to SplitSats to pay your friends without leaving the app! ⚡
            </Text>
            <Text style={styles.description}>
              If you don't have a Lightning Wallet (NWC) yet, use Alby to create one</Text>
            <Text style={styles.description}>You can always disconnect it at any time.</Text>
           <TouchableOpacity onPress={handleConnectButton} style={styles.connectButton}>
              <Text style={styles.buttonText}>CONNECT NWC</Text>
            </TouchableOpacity>
            <ConfirmButton
              title="CONNECT WITH ALBY 🐝"
              onPress={navigateToWebView}
              disabled={false}
            />
          </>
        )}
        {nwcUrl && (
          <>
            <Text>Connected!</Text>
          </>
        )}
        
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
  connectButton: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: '#83A2AE', // Background color of the button
    width: '80%',
    height: 50,
    alignSelf: 'center',
    overflow: 'hidden',
    bottom: 100,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    color: 'black', // Text color
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  },
});

export default WalletConnectScreen;
