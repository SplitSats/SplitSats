import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, FILL_CARD_COLOR } from "@styles/styles";
import CancelIcon from "@assets/icon/Cancel.png";
import QRIcon from "@assets/icon/QR-code.png";
import SearchIcon from "@assets/icon/Search.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import ConfirmButton from "@comps/ConfirmButton";
import QRCodeScreen from "@comps/account/QRcode";
import SearchCardComponent from "@comps/SearchCardComponent";
import { useUserProfileStore, useContactManagerStore } from '@store'

import { err, l } from "@log";
import { nip05 } from 'nostr-tools'
import NDKManager  from '@nostr'
import { ContactManager, Contact } from '@src/managers/contact'
import { defaultNpubs } from '@nostr/consts'


const AddFriendScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const ndkManager = NDKManager.getInstance();
	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
  const { contactManager, setContactManager, clearContactManager } = useContactManagerStore();
  // const contactManager =  new ContactManager();
  const [users, setUsers] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);


  useEffect(() => {
    (async () => {
      await setContactManager(new ContactManager()); 

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      // Populate users with default npubs  
      defaultNpubs.forEach(npub => {
        addNpubContact(npub);
      });  
    })();
  }, []);


  const addNpubContact = async (npub: string) => {
    const queryUserProfile = await ndkManager.queryNostrProfile(npub);
    if (queryUserProfile) {
        const contact = new Contact(queryUserProfile.name, npub, queryUserProfile);
        l("contact", contact);
        // Update the users array with the new contact
        await setUsers(users => [...users, contact]);
        return true;
    }
    err("Failed to add contact with npub: ", npub);
    return false;
  };


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    // Handle your QR Code data here
  };

  const handleInputChange = async (text) => {
    setSearchTerm(text);
    if (text.startsWith('npub')) { 
      addNpubContact(text);
    }
    setIsTyping(text.length > 0);
  };

  // Handler to handle selection change in SearchCardComponent
  const handleSelectionChange = (contact, selectedState) => {
    if (selectedState) {
      setSelectedContacts(prevSelectedContacts => [...prevSelectedContacts, contact]);
    } else {
      setSelectedContacts(prevSelectedContacts =>
        prevSelectedContacts.filter(c => c.npub !== contact.npub)
      );
    }
  };


  const handleFinish = () => {
    // Add only the selected contacts to the contact manager
    selectedContacts.forEach(contact => {
      contactManager.addContact(contact);
    });
    // Lets follow the selected contacts
    const result = ndkManager.followNpubs(selectedContacts.map(contact => contact.npub));
    if (!result) {
      err("Failed to follow npubs: ", selectedContacts.map(contact => contact.npub));
    }
    l()

    // Save the updated contact manager to the store
    setContactManager(contactManager);
    navigation.navigate("Dashboard");
  }

  const handleCancel = () => {
    setSearchTerm("");
    setIsTyping(false);
    setScanned(false);
  };
  
  return isScannerOpen ? (
    <QRCodeScreen 
      scanned={scanned}
      handleFunc={handleBarCodeScanned}
      setScannerOpen={setScannerOpen}
    />
  ) : (
    <View style={styles.container}>
    <View>
      <Text style={styles.headerText}>ADD FRIENDS</Text>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome {userProfile.name}</Text>
        <Image
          source={{ uri: userProfile.picture }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.searchSection}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="npub, username, NIP05"
          placeholderTextColor={"grey"}
          value={searchTerm}
          onChangeText={handleInputChange}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(searchTerm.length > 0)}
          selectTextOnFocus={true} // Enable text selection on focus
          contextMenuHidden={false} // Show context menu (Cut, Copy, Paste, etc.)
        />
        {isTyping ? (
          <TouchableOpacity onPress={handleCancel}>
            <Image source={CancelIcon} style={styles.qrCodeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setScannerOpen(true)}>
            <Image source={QRIcon} style={styles.qrCodeIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>

    <FlatList
      style={styles.userList}
      data={users}
      keyExtractor={(contact) => contact.npub}
      renderItem={({ item }) => (
        <SearchCardComponent
          contact={item}
          onSelectionChange={handleSelectionChange}
        />
      )}
    />
    <ConfirmButton
        disabled={false}
        title="FINISH"
        onPress={() => handleFinish()}
      />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 20,
  },
  scanText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: "20%",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FILL_CARD_COLOR,
    margin: 20,
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: "white",
  },
  searchIcon: {
    padding: 10,
    marginLeft: 20,
    width: 15,
    height: 15,
  },
  preview: {
    flex: 1,
  },
  qrCodeIcon: {
    marginRight: 20,
    padding: 10,
    width: 15,
    height: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default AddFriendScreen;
