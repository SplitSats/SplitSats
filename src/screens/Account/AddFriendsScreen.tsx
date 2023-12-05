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
  SafeAreaView
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
// import Swipeable from "react-native-swipeable";

import { err, l } from "@log";
import { nip05 } from 'nostr-tools'
// import NDKManager  from '@nostr'
import { ContactManager, Contact } from '@src/managers/contact'
import { defaultNpubs } from '@nostr/consts'
import Header from "@comps/Header";
import { useNDK } from '@src/context/NDKContext';
import { queryNostrProfile, followNpubs } from '@nostr'

const AddFriendScreen = ({ navigation }) => {
  const ndk = useNDK();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // const ndkManager = NDKManager.getInstance();
	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
  const { setContactManager, getContactManager, initializeContactManager } = useContactManagerStore();
  // const contactManager =  new ContactManager();

  const [currentContactManager, setCurrentContactManager] = useState(null); // ContactManager instance
  const [users, setUsers] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const TAG = '[AddFriendScreen] ';

  const isHydrated = useContactManagerStore((state) => state.rehydrated);
  const contactManager = useContactManagerStore((state) => state.getContactManager());

  // Check if the store is hydrated before using the ContactManager data
  if (!isHydrated) {
    return <div>Loading...</div>; // Or any loading indicator while data is being fetched
  }

  useEffect(() => {  
    (async () => {
      // Set the current contact manager
      l("[AddFriendScreen] Setting current contact manager");
      l(contactManager)
      if(!contactManager){
        await initializeContactManager()
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await setContactManager(new ContactManager()); 

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      // Populate users with default npubs  
      defaultNpubs.forEach(npub => {
        // add the npub to the users array if it is not already present
        if (!users.some(contact => contact.npub === npub))
        {
          searchNpubContact(npub);
        }
      });  
    })();
  }, []);


  const searchNpubContact = async (npub: string) => {
    const queryUserProfile = await queryNostrProfile(ndk, npub);
    if (queryUserProfile) {
        const contact = new Contact(queryUserProfile.name, npub, queryUserProfile);
        // l("contact", contact);
        // Update the users array with the new contact
        await setUsers(users => [...users, contact]);
        return true;
    }
    return false;
  };


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    // Check if the scanned data starts with nostr:npub
    if (data.startsWith("nostr:npub")) {
      // Extract the npub from the data
      const npub = data.split("nostr:")[1];
      // Add the npub to the users array
      searchNpubContact(npub);
    } else {
      err("Invalid QR Code data: ", data);
    }
  };

  const handleInputChange = async (text) => {
    setSearchTerm(text);
    if (text.length > 0) {
      searchNpubContact(text);
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
      if(!contactManager){
        err("Contact manager is null");
        return;
      }
      contactManager.addContact(contact);
    });
    l(TAG, "Contacts: ", contactManager?.getContacts());
    // Lets follow the selected contacts
    const result = followNpubs(ndk, selectedContacts.map(contact => contact.npub));
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

  // Function to remove a contact from the users list
  const handleRemoveContact = (contactToRemove) => {
    const updatedUsers = users.filter(contact => contact.npub !== contactToRemove.npub);
    setUsers(updatedUsers);
  };
  
  const handleBack = () => {
    navigation.goBack();
  }
  
  // Function to remove a contact from the users list
  const handleRemoveContact = (contactToRemove) => {
    const updatedUsers = users.filter(contact => contact.npub !== contactToRemove.npub);
    setUsers(updatedUsers);
  };
  
  return isScannerOpen ? (
    <QRCodeScreen 
      scanned={scanned}
      handleFunc={handleBarCodeScanned}
      setScannerOpen={setScannerOpen}
    />
  ) : (
    <SafeAreaView style={styles.container}>
    <View>
      <Header title="ADD FRIENDS" onPressBack={handleBack} />

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
          placeholder="npub or NIP05"
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
        // <Swipeable rightButtons={[
        //   <TouchableOpacity
        //     style={styles.deleteButton}
        //     onPress={() => handleRemoveContact(item)}
        //   >
        //     <Text style={styles.deleteButtonText}>Remove</Text>
        //   </TouchableOpacity>
        // ]}>
          <SearchCardComponent
            contact={item}
            onSelectionChange={handleSelectionChange}
            onRemove={handleRemoveContact} // Pass the removal handler to the card component
          />
        // </Swipeable>
      )}
    />
    <ConfirmButton
        disabled={false}
        title="FINISH"
        onPress={() => handleFinish()}
      />
  </SafeAreaView>
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
    borderWidth:2,
    borderColor:'#0F172A',
    backgroundColor: DARK_GREY,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddFriendScreen;
