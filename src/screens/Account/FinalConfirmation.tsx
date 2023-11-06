import React, { useState } from "react";
import CreateAccountWrap from "@comps/CreateAccountWrap";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { PRIMARY_COLOR } from "@styles/styles";
import { IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import Checkbox from "expo-checkbox";

const FinalConfirmation = ({ navigation }) => {
  //Hardcode the properties just for test
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const privateKey = "npub1jvwer7w272as2eaneruv3pg8h";
  const publicKey = "npub1jvwer7w272as2eaneruv3pg8h";

  const copyPublicKeyToClipboard = async () => {
    await Clipboard.setStringAsync(publicKey);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ACCOUNT CREATED</Text>
      <View style={styles.cardContainer}>
        <CreateAccountWrap />
        <View style={styles.checkOverlay}>
          <Image
            source={require("@assets/logo/Splitsats_Logo_B.png")}
            style={styles.checkIcon}
          />
        </View>
      </View>
      {/* Nostr Account Created Text */}
      <Text style={styles.title}>Nostr account successfully created!</Text>
      {/* Emojis and Info Text */}
      <Text style={styles.noteText}>
        🔑 Your keys are stored locally. {"\n"}❗ REMEMBER TO SECURELY SAVE YOUR
        KEYS AND BACKUP THEM!
      </Text>

      {/* Private Key */}
      <Text style={styles.keyLabel}>Private key</Text>
      <View style={styles.keyContainer}>
        <Text style={styles.keyText}>
          {showPrivateKey ? privateKey : "*".repeat(privateKey.length)}
        </Text>
        <IconButton
          icon={showPrivateKey ? "eye-off" : "eye"}
          onPress={() => setShowPrivateKey(!showPrivateKey)}
        />
      </View>

      {/* Public Key */}
      <Text style={styles.keyLabel}>Public key</Text>
      <View style={styles.keyContainer}>
        <Text style={styles.keyText}>{publicKey}</Text>
        <IconButton icon="content-copy" onPress={copyPublicKeyToClipboard} />
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isCheckboxChecked}
          onValueChange={setCheckboxChecked}
        />
        <Text style={styles.textCheckBox}>I've backed up my Private key</Text>
      </View>
      <View style={styles.button}>
        {/* Add Friends Button */}
        <Button
          title="ADD FRIENDS"
          disabled={!isCheckboxChecked}
          onPress={() => {
            /* handle add friends logic here */
          }}
        />
      </View>
    </View>
  );
};
//            <Image source={require('@assets/logo/check 1.png')}/>
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    alignItems: "center",
  },
  //I put the position absolut so we can achieve the overlaying
  //remember that the order of calling component are important ---! dont change the order

  checkOverlay: {
    position: "absolute",
    opacity: 0.6,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    borderWidth: 3,
    borderColor: "#83A3EE",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  noteText: {
    color: "white",
    padding: 30,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    marginTop:7,
    borderRadius: 25,
    backgroundColor: "#3282B8",
    width: "90%",
    height: 50,
    alignSelf: "center",
    overflow: "hidden",
    bottom: 20,
  },
  checkIcon: {
    width: 100,
    height: 100,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  keyContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#333A4A",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  keyLabel: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  keyText: {
    marginLeft: 15,
    color: "white",
    flex: 3,
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  

  },
  textCheckBox: {
    marginLeft: 10,
    color: "white",
    textAlign: "center",
  },
});

export default FinalConfirmation;
