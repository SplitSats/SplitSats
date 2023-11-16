import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, ScrollView } from "react-native";
import { PRIMARY_COLOR } from "@styles/styles";
import { IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import Checkbox from "expo-checkbox";
import CreateAccountWrap from "@comps/account/CreateAccountWrap";
import ConfirmButton from '@comps/ConfirmButton';
import { l } from "@log";
import { useUserProfileStore } from '@store'
import { toPrivateKeyHex } from '@nostr/util';
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';


const FinalConfirmation = ({ navigation }) => {
	const { reset } = navigation

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [npub, setNpub] = useState("");
  const [nsec, setNsec] = useState("");
  
  const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();

  l("FinalConfirmation")
  l("userProfile", userProfile)
  
  const copyPublicKeyToClipboard = async() => {
    await Clipboard.setStringAsync(npub);
    alert("Public key copied to clipboard");
  };

  const copyPrivateKeyToClipboard = async () => {
    await Clipboard.setStringAsync(nsec);
    alert("Private key copied to clipboard");
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

  const handleAddFriends = () => {
		reset({index: 0, routes: [{ name: "Groups" }]})
    // navigation.navigate("Groups");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>ACCOUNT CREATED</Text>
        <View style={styles.cardContainer}>
          <CreateAccountWrap userProfile={userProfile} />

          <View style={styles.checkOverlay}>
            <Image
              source={require("@assets/logo/Splitsats_Logo_B.png")}
              style={styles.checkIcon}
            />
          </View>
        </View>
        {/* Nostr Account Created Text */}
        <Text style={styles.title}>Nostr account successfullyyy created!</Text>
        {/* Emojis and Info Text */}
        <Text style={styles.noteText}>
          🔑 Your keys are stored locally. {"\n"}❗ REMEMBER TO SECURELY SAVE
          YOUR KEYS AND BACKUP THEM!
        </Text>

        {/* Private Key */}
        <Text style={styles.keyLabel}>Private key</Text>
        <View style={styles.keyContainer}>
          <Text style={styles.keyText}>
            {showPrivateKey ? nsec : "*".repeat(nsec.length)}
          </Text>
          <IconButton
            icon={showPrivateKey ? "eye-off" : "eye"}
            onPress={() => setShowPrivateKey(!showPrivateKey)}
          />
          <IconButton icon="content-copy" onPress={copyPrivateKeyToClipboard} />
        </View>

      {/* Public Key */}
      <Text style={styles.keyLabel}>Public key</Text>
      <View style={styles.keyContainer}>
        
        <Text style={styles.keyText}>{npub}</Text>
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
        <ConfirmButton
          title="ADD FRIENDS"
          onPress={handleAddFriends}
          disabled={isCheckboxChecked} // Disable the button when loading
        />
    </ScrollView>
  );
};

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
    position: "absolute",
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
