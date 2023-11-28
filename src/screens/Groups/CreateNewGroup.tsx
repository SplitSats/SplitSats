import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image, 
  Platform,
} from "react-native";
import SearchIcon from "@assets/icon/Search.png";
import SearchCardComponent from "@comps/SearchCardComponent";
import GroupHeaderComponent from "@comps/GroupHeaderComponent";
import { PRIMARY_COLOR, SECONDARY_COLOR, FILL_CARD_COLOR } from "@styles/styles";
import MemberCardComponent from "@comps/MemberCardComponent";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import Header from "@comps/Header";
import { useUserProfileStore, useContactManagerStore, useGroupManagerStore } from '@store'
// import NDKManager  from '@nostr'
import ConfirmButton from "@comps/ConfirmButton";
import { ContactManager, Contact } from '@src/managers/contact'
import { l, err } from '@log';
import SearchUser from '@comps/SearchUser';
import { Group, GroupManager } from '@src/managers/group';

const CreateNewGroup = ({ navigation, route }) => {
  
  const { contactManager, setContactManager, clearContactManager } = useContactManagerStore();
  const { grouptManager, setGroupManager, clearGroupManager } = useGroupManagerStore();
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedContacts, setSelectedContacts] = useState([]);


  const handleAddFriends = () => {
    navigation.navigate("AddFriend");
  };


  useEffect( () => {
    const fetchContacts = async () => {
      const contacts = await contactManager.getContacts();
      l("Contacts: ", contacts)
      setUsers(contacts);
      l("Users: ", users)
    }  
    fetchContacts();
  }, []);

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
    console.log('Selected Contacts: ', selectedContacts);
    navigation.navigate("Dashboard")
  }

  const handleBack = () => {
    navigation.goBack();
  }
  // Function to sort users based on the search term
  const sortUsers = () => {
    if (searchTerm) {
      const sortedUsers = users.filter((user) =>
        user.profile.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(sortedUsers);
    } else {
      contactManager.getContacts().then((contacts) => {
        setUsers(contacts);
      });
    }
  };

  useEffect(() => {
    sortUsers();
  }, [searchTerm]); // Re-sort whenever searchTerm changes

  const handleRemoveContact = (contactToRemove) => {
    const updatedUsers = users.filter(contact => contact.npub !== contactToRemove.npub);
    setUsers(updatedUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Header title="New Group" onPressBack={handleBack} />

      <GroupHeaderComponent />
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={users}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.membersList}>
              {selectedContacts.length === 0 ? (
                <Text style={styles.groupMembersText}>Group Members</Text>
              ) : (
                selectedContacts.map((member, index) => (
                  <MemberCardComponent
                    key={index}
                    contact={member}
                  />
                ))
              )}
            </View>

            <Text style={styles.sectionTitle}>Your friends</Text>
            <SearchUser
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onIconPress={handleAddFriends}
            />
          </View>
        )}
        renderItem={({ item }) => (
          <SearchCardComponent
            contact={item}
            onSelectionChange={handleSelectionChange}
            onRemove={handleRemoveContact}
          />
        )}
        keyExtractor={(item) => item.npub}
      />
      
      <ConfirmButton
        disabled={false}
        title="CREATE GROUP"
        onPress={() => handleFinish()}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: PRIMARY_COLOR,
  // },
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for Android status bar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  groupMembersText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginLeft: 20,

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  membersHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: PRIMARY_COLOR,
  },
  membersList: {
    flexDirection: "row",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // Add additional styling as needed
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom:20,
    // Add additional styling as needed
  },
  searchInput: {
    flex: 1,
    height: 35,
    backgroundColor: FILL_CARD_COLOR,
    borderRadius: 20,
    padding: 10,
    color: "white",
    // Adjust colors and styling to match your theme
  },
  addButton: {
    marginLeft: 10,
    // Add additional styling as needed
  },
  searchIcon: {
    padding: 10,
    width: 10,
    height: 10,
  },
});

export default CreateNewGroup;
