import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface QRCodeProps {
    npub: string;
  }
  
  const QRCodeScreen: React.FC<QRCodeProps> = ({ npub }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Scan the QR code to open the Nostr URL:</Text>
        <View style={styles.qrCodeContainer}>
          <QRCode value={`nostr://${npub}`} size={100} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,    
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
      color: 'white',
    },
    qrCodeContainer: {
      backgroundColor: 'white', // Background color of the QR code container
      padding: 20,
      borderRadius: 10,
    },
  });
  
  export default QRCodeScreen;
  