import React, { useState } from "react";
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

const KeysScreen = () => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  const publicKey =
    "npub1q6le8ppm0nz0gdnfl4jxy77su3l8t56pqm99t4xpwl5uez6c7q7zqtl6";
  const nsec = "npub1q6le8ppm0nz0gdnfl4jxy77su3l8t56pqm99t4xpwl5uez6c7q7zqtl6";

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert("Copied to clipboard!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Keys</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Public key</Text>
        <Text style={styles.keyText}>{publicKey}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => copyToClipboard(publicKey)}
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
          This key fully controls your account. Don't share it with anyone!
        </Text>
        <Text style={styles.warning}>
          REMEMBER TO SECURELY SAVE YOUR PRIVATE KEY!
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
    paddingLeft: "50%",
    top: 5,
  },
  privateKeyandShowKey: {
    flexDirection: "row",
  },
  copyicon: {
    width: 25,
    height: 25,
    marginRight:10,
  },
});

export default KeysScreen;
