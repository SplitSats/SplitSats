
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ButtonConfirm from '@comps/ButtonConfirm'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import Header from "@comps/Header";
import { useNWCContext, useConnectWithAlby, useNwcUrl } from '@src/context/NWCContext';
import WebView from 'react-native-webview';
import { err, l } from '@log';
import WebViewScreen  from '@screens/WebViewScreen';
import { webln } from "@getalby/sdk";
import { useFocusEffect } from '@react-navigation/native';
import { Coin } from '@src/managers/coin';
import { createWallet, deleteWallet, NWC_URL } from '@store/secure';
import  SuccessModal from '@comps/ModalSuccess';
import LoadingModal from '@comps/ModalLoading';


const WalletConnectScreen = ({ navigation }) => {
  
  const [nwcUrl, setNwcUrl] = useNwcUrl();
  const [useAlby, setUseAlby] = useState<boolean>(false);
  const [
    connectWithAlby,
    nwcUrlState,
    pendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
    setNwcUrlState,
  ] = useConnectWithAlby();
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [balance, setBalance] = useState(new Coin(0, 'sats'));
  const { nostrWebLN, setNostrWebLN } = useNWCContext();
  const handleBack = () => {
    navigation.goBack();
  }

  const connectWithAlbyHandle = async () => {
    setIsLoading(true);
    await connectWithAlby();
    l('pendingUrl:', pendingNwcUrl);
    if (pendingNwcUrl) {
      setNwcUrl(pendingNwcUrl);
    }
    setIsLoading(false);
    navigation.navigate('WebViewScreen');
  }

  useEffect(() => {    
    const handleWebLN = async () => {
      if (!nwcUrl) {
        l('HandleWebLN: nwcUrl is null');
        return;
      }
      
      l('nwcUrl:', nwcUrl);
      l("Enabling NostrWebLN...");
      // setIsLoading(true);
      const nostrWebLN = new webln.NostrWebLNProvider({
        nostrWalletConnectUrl: nwcUrl,
      });
      setNostrWebLN(nostrWebLN);
      await nostrWebLN.enable();
      createWallet(NWC_URL, nwcUrl);
      l("NostrWebLN enabled!");
      const response = await nostrWebLN.getBalance();
      l("Balance>", response);
      setBalance(new Coin(response.balance, response.currency));
      setIsLoading(false);
      setIsSuccess(false);
    };
  handleWebLN();
  }, [nwcUrl]);

  const handleConnectButton = async () => {
    navigation.navigate('NostrWalletConnect');
  };

  const disconnectWallet = async () => {
    setIsLoading(true);
    l('Disconnecting wallet...');
    setNwcUrl('');
    deleteWallet(NWC_URL);
    setNostrWebLN(null);
    l('Wallet disconnected!');
    setIsLoading(false);
    setIsSuccess(false);
  }

  const toggleModal = () => {
    setIsSuccess(!isSuccess);
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
            <ButtonConfirm
              title="CONNECT WITH ALBY 🐝"
              onPress={connectWithAlbyHandle}
              disabled={false}
            />
          </>
        )}
        {nwcUrl && (
          <>
            <Text style={styles.title}>Wallet Connected ✅</Text>
            <Text style={styles.balance}>
              Balance: {balance.amount} {balance.currency}.
            </Text>

            <Text style={styles.description}>
              Your wallet is connected to SplitSats!
            </Text>
            <Text style={styles.description}>
              You can now pay your friends directly from your wallet.
            </Text>
            <Text style={styles.description}>
              You can always disconnect it at any time.
            </Text>
            <ButtonConfirm
              title="DISCONNECT"
              onPress={disconnectWallet}
              disabled={false}
            />
          </>
        )}      
        <LoadingModal visible={isLoading} message="Loading..." />
        <SuccessModal
          isVisible={isSuccess}
          onClose={toggleModal}
          message="Success!"
          description="Wallet connected!"
        />
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
    marginBottom: 12, // Adjust the margin as needed
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
  balance: {
    fontSize: 30,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  },
});

export default WalletConnectScreen;
