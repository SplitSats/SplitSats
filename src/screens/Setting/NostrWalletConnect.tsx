
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ButtonConfirm from '@comps/ButtonConfirm'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import Header from "@comps/Header";
import { useNWCContext, useConnectWithAlby, useNwcUrl, useNWCEnable } from '@src/context/NWCContext';
import QRCodeScreen from "@comps/QRcode";
import { err, l } from '@log';


const NostrWalletConnectScreen = ({ navigation }) => {
  
  const [loading, setLoading] = useState(true); 
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const { 
		nwcUrl,
        setNwcUrl,
        pendingNwcUrl,
        setPendingNwcUrl,
        nwcAuthUrl,
        setNwcAuthUrl,
        nostrWebLN,
        setNostrWebLN
  } = useNWCContext();

  const handleBack = () => {
		navigation.goBack();
	}  

  const handleConnect = async () => {
    setLoading(true);
    await setNwcUrl(nwcUrl);
    setLoading(false);
	await useNWCEnable(nwcUrl);
    navigation.navigate('ConfirmCreateAccount');
  }

  const handleTextChange = (text) => {
	setNwcUrl(text);
	setLoading(false);
  }


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    // Check if the scanned data starts with nostr:npub
    if (data.startsWith("nostr+walletconnect://")) {
      // TODO: Handle connection with NWC wallet 
	  setNwcUrl(data);
	  l('nwcUrl:', nwcUrl);
	  setLoading(false);
    } else {
      err("Invalid QR Code data: ", data);
    }
  };

  return isScannerOpen ? (
	<QRCodeScreen 
		scanned={scanned}
		handleFunc={handleBarCodeScanned}
		setScannerOpen={setScannerOpen}
	/>
	) : (
		<SafeAreaView style={styles.container}>
			<Header title="NWC" onPressBack={handleBack} />

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>PASTE HERE YOUR NWC CONNECTION STRING</Text>
				<TextInput
					style={styles.input}
					placeholder="nostr+walletconnect://"
					value={nwcUrl} // Bind the value to the state
					onChangeText={(text) => handleTextChange(text)} // Update the state with user input
				/>
			</View>


			<TouchableOpacity onPress={() => setScannerOpen(true)} style={styles.connectButton}>
              <Text style={styles.buttonText}>SCAN QR CODE</Text>
            </TouchableOpacity>
            
			<ButtonConfirm
				title="CONNECT"
				onPress={handleConnect}
				disabled={loading} 
    		/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR, // Replace with your primary color
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	inputContainer: {
		width: '100%',
		padding: 20,
		alignItems: 'center',
		marginTop: "50%",

	},
	inputLabel: {
		color: SECONDARY_COLOR, // Replace with your secondary color
		marginBottom: 10,
	},
	input: {
		width: '100%',
		height: 40,
		borderWidth: 2,
		color: 'white',
		borderColor: SECONDARY_COLOR, // Replace with your secondary color
		borderRadius: 10,
		padding: 10,
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
})

export default NostrWalletConnectScreen;
