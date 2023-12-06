
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConfirmButton from '@comps/ConfirmButton'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import Header from "@comps/Header";
import { useNWCContext, useConnectWithAlby } from '@src/context/NWCContext';
import WebView from 'react-native-webview';
import { err, l } from '@log';
import WebViewScreen  from '@src/components/WebViewScreen';


const WalletConnectScreen = ({ navigation }) => {
  
  const [
    connectWithAlby,
    nwcUrl,
    pendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
    setNwcUrl
  ] = useConnectWithAlby();

  const handleBack = () => {
    navigation.goBack();
  }

  const navigateToWebView = () => {
    navigation.navigate('WebViewScreen', { url: nwcAuthUrl });
  };

  const handleConnectButton = async () => {
    try {
      await connectWithAlby(); // Triggering the connection logic
      l('nwcAuthUrl:', nwcAuthUrl);
      if (nwcAuthUrl)
        navigateToWebView(nwcAuthUrl);
      else 
        err('nwcAuthUrl is empty');
    } catch (error) {
      console.error('Error connecting with Alby:', error);
    }
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
              You can always disconnect it at any time.
            </Text>
            <ConfirmButton
              title="CONNECT YOUR WALLET"
              onPress={handleConnectButton}
              disabled={false}
            />
          </>
        )}
        {nwcUrl && (
          <>
            <Text>Connected!</Text>
          </>
        )}
        {nwcAuthUrl && (
          <WebView
            source={{ uri: nwcAuthUrl }}
            injectedJavaScriptBeforeContentLoaded={`
              // Listen for window messages and post them to the React Native WebView
              window.addEventListener("message", (event) => {
                window.ReactNativeWebView.postMessage(event.data?.type);
              });
            `}
            onMessage={(event) => {
              if (event.nativeEvent.data === 'nwc:success') {
                setNwcAuthUrl("");
                setNwcUrl(pendingNwcUrl);
              }
            }}
          />
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
});

export default WalletConnectScreen;
