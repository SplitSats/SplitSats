
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Clipboard } from 'react-native';
import ButtonConfirm from '@comps/ButtonConfirm'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import Header from "@comps/Header";
import { useNWCContext, useConnectWithAlby, useNwcUrl, useNWCEnable } from '@src/context/NWCContext';
import QRCodeScreen from "@comps/QRcode";
import { err, l } from '@log';
import { webln } from "@getalby/sdk";
import LoadingModal from '@comps/ModalLoading';


const NostrWalletConnectScreen = ({ navigation }) => {
  
  const [loading, setLoading] = useState(false); 
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [nwcUrl, setNwcUrl]= useNwcUrl();
  const [userUrl, setUserUrl] = useState('');

  const handleBack = () => {
		navigation.goBack();
	}  
  const handlePasteFromClipboard = async () => {
		const clipboardContent = await Clipboard.getString(); // Get content from clipboard
		setUserUrl(clipboardContent); // Set the content to the TextInput value
		setLoading(false);
	};
  const handleConnect = async () => {
    setLoading(true);
	if (!userUrl) {
		err('userUrl is null');
		return;
	}
	await setNwcUrl(userUrl);
	l('Handle connect with NWCUrl: ', nwcUrl);
	// const [isLoading, isError, error, webln] = useNWCEnable(nwcUrl);
	const nostrWebLN = new webln.NostrWebLNProvider({
		nostrWalletConnectUrl: userUrl,
	  });
	await nostrWebLN.enable();
	const response = await nostrWebLN.getInfo();
	l('NWC Respose: ', response);
    setLoading(false);
    navigation.navigate('ConfirmCreateAccount');
  }

  const handleTextChange = async (text) => {
	await setUserUrl(text);
	setLoading(false);
  }


  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    // Check if the scanned data starts with nostr:npub
    if (data.startsWith("nostr+walletconnect://")) {
      // TODO: Handle connection with NWC wallet 
	  await setUserUrl(data);
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
					value={userUrl} // Bind the value to the state
					onChangeText={(text) => handleTextChange(text)} // Update the state with user input
				/>
				 <TouchableOpacity onPress={handlePasteFromClipboard} style={styles.pasteButton}>
        			<Text style={styles.inputLabel}>Paste</Text>
      			</TouchableOpacity>
			</View>
			<LoadingModal visible={loading} message="Loading..." />

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
	pasteButton: {
		borderRadius: 25,
		backgroundColor: PRIMARY_COLOR, // Background color of the button
		width: '80%',
		height: 50,
		alignSelf: 'center',
		overflow: 'hidden',
		marginBottom: 10, // Margin bottom for spacing
		justifyContent: 'center', // Center vertically
		alignItems: 'center', // Center horizontally
		color: 'black', // Text color
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
