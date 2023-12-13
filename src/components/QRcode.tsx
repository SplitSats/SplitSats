import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CancelIcon from "@assets/icon/Cancel.png";

const QRCodeScreen: React.FC<QRCodeProps & { setScannerOpen: (open: boolean) => void }> = ({ scanned, handleFunc, setScannerOpen })  => {
    return (
      <View style={styles.cameraContainer}>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned ? undefined : handleFunc}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setScannerOpen(false)}
          >
            <Image
              style={styles.Cancelicon}
              source={CancelIcon}
            />
          </TouchableOpacity>
        </View>
    );
  };
  
  const styles = StyleSheet.create({

    cameraContainer: {
        flex:1,
        flexDirection:'column',
        backgroundColor:'black'
      },
      closeButton: {
        position: 'absolute',
        top: 45,
        right: 20,
        backgroundColor: 'transparent',
        padding: 10,
      },
      Cancelicon: {
        marginRight: 20,
        padding: 10,
        width: 15,
        height: 15,
      },
  });
  
  export default QRCodeScreen;