import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Image,
} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { copyIcon } from "@src/data";
import Header from "@comps/Header";
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';

const KeysScreen = ({ navigation }) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [npub, setNpub] = useState("");
  const [nsec, setNsec] = useState("");

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const nsec = await getWallet(NSEC);
      setNsec(nsec);
      const npub = await getWallet(NPUB);
      setNpub(npub);
    };
    fetchKeys();
  }, []);


  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="KEYS" onPressBack={handleBack} />

      <Text style={styles.headerText}></Text>
      <View style={styles.section}>
        <Text style={styles.title}>Public key</Text>
        <Text style={styles.keyText}>{npub}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => copyToClipboard(npub)}
        >
          <Image
            source={copyIcon}
            resizeMode="contain"
            style={styles.copyicon}
          />
          <Text style={styles.buttonText}>Copy public key</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Your friends on Nostr can find you via your public key. Share it with
          them!
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.privateKeyandShowKey}>
          <Text style={styles.title}>Private key</Text>
          <TouchableOpacity onPress={() => setIsKeyVisible(!isKeyVisible)}>
            <Text style={styles.showKey}>SHOW KEY</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.keyText}>
          {isKeyVisible ? nsec : "*".repeat(nsec.length)}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => copyToClipboard(nsec)}
        >
          <Image
            source={copyIcon}
            resizeMode="contain"
            style={styles.copyicon}
          />
          <Text style={styles.buttonText}>Copy private key</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
        ⚠️ This key fully controls your account. Don't share it with anyone!
        </Text>
        <Text style={styles.warning}>
        ❗REMEMBER TO SECURELY SAVE YOUR PRIVATE KEY!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Assuming the background is black
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  section: {
    marginBottom: 20,
    padding: 10, // Add padding to the key container
    borderRadius: 15, // Add border radius to make it slightly rounded
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  keyText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: DARK_GREY, // Assuming a dark gray background for the key container
    padding: 10,
    borderRadius: 10,
    
  },
  button: {
    backgroundColor: SECONDARY_COLOR, // Adjust the color as needed
    padding: 10,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  description: {
    color: "#aaa", // Lighter text color for the description
    marginBottom: 10,
  },
  warning: {
    color: "red", // Warning text color
    marginBottom: 10,
  },
  showKey: {
    color: SECONDARY_COLOR,
    // put on the right
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  privateKeyandShowKey: {
    flexDirection: "row",
    justifyContent: "space-between", // Align elements horizontally
    alignItems: "center", // Center vertically
    marginBottom: 10,
  },
  copyicon: {
    width: 25,
    height: 25,
    marginRight:10,
  },
});

export default KeysScreen;
