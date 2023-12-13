import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image, 
  Platform,
  StatusBar,
  Alert,

} from "react-native";
import SearchIcon from "@assets/icon/Search.png";
import SearchCardComponent from "@comps/CardComponentSearch";
import GroupHeaderComponent from "@comps/GroupHeaderComponent";
import { PRIMARY_COLOR, SECONDARY_COLOR, FILL_CARD_COLOR } from "@styles/styles";
import MemberCardComponent from "@comps/CardComponentMember";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import Header from "@comps/Header";
import { useUserProfileStore, useContactManagerStore, useGroupManagerStore } from '@store'
// import NDKManager  from '@nostr'
import ButtonConfirm from "@comps/ButtonConfirm";
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { ContactManager, Contact } from '@src/managers/contact'
import { l, err } from '@log';
import SearchUser from '@comps/SearchUser';
import { Group, GroupManager } from '@src/managers/group';
import ConfirmModal  from "@comps/ModalConfirm"; 
import { useNDK } from '@src/context/NDKContext';
import { publishGroup } from '@nostr';

const CreateNewGroup = ({ navigation, route }) => {

	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
  const { setContactManager, getContactManager, initializeContactManager } = useContactManagerStore();
  const { setGroupManager, clearGroupManager, initializeGroupManager } = useGroupManagerStore();
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupImageUri, setGroupImageUri] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const contactManager = useContactManagerStore((state) => state.getContactManager());
  const groupManager = useGroupManagerStore((state) => state.getGroupManager());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ndk = useNDK();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddFriends = () => {
    navigation.navigate("AddFriend");
  };

  const initGroupManager = async () => {
    try {
      if (!groupManager) {
        await initializeGroupManager();
        l("Group manager initialized");
      } else {
        l("Group manager already initialized");
      }
    } catch (error) {
      err('Error initializing group manager:', error);
    }
  };

  useEffect(() => {  
    initGroupManager();
  }, []);

  useEffect( () => {
    const fetchContacts = async () => {
      if (!contactManager) {
        err("Contact manager not initialized");
        return;
      }
      const contacts = await contactManager.getContacts();
      l("Contacts: ", contacts)
      await setUsers(contacts);
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

  const handleCreateGroup = async () => {
    if (!groupName || !groupImageUri) {
      Alert.alert('Please provide a group name and image.');
      return;
    }
    const userNpub = await getWallet(NPUB);
    // Create a new Group instance
    const newGroup = new Group(
      userNpub,
      groupName,
      groupImageUri,
      selectedContacts.map(contact => contact.npub),
      "private" //TODO: Add also public groups?
    );
    const groupId = await newGroup.createId();
    l("Group ID: ", groupId);
    l("Group: ", newGroup);
    // Assuming you have a group manager instance available
    if (groupManager) {
      try {
        // Add the new group to the GroupManager
        groupManager.addGroup(newGroup);
        await publishGroup(ndk, newGroup);
        await setGroupManager(groupManager);
        console.log('New group created:', newGroup);
        showToast('Group created successfully!');
        navigation.navigate('Dashboard');
        closeModal();
      } 
      catch (error) {
        showToast('Error creating group. Please try again.');
      }
    }
  }

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000); // Hide the toast after 3 seconds
  };

  const handleFinish = async () => {
    setIsModalVisible(true);
  };


  const handleBack = () => {
    navigation.goBack();
  }

  // Function to sort users based on the search term
  const sortUsers = async () => {
    if (searchTerm) {
      const sortedUsers = users.filter((user) =>
        user.profile.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(sortedUsers);
    } else {
      const contacts = await contactManager.getContacts()
      if(contacts.length > 0) {
        setUsers(contacts);
      };
    }
  };

  useEffect(() => {
    sortUsers();
  }, [searchTerm]); // Re-sort whenever searchTerm changes

  const handleRemoveContact = (contactToRemove) => {
    const updatedUsers = users.filter(contact => contact.npub !== contactToRemove.npub);
    setUsers(updatedUsers);
  };
  const handleGroupNameChange = (name) => {
    setGroupName(name);
  };

  const handleGroupImageUriChange = (uri) => {
    setGroupImageUri(uri);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };


  const handleNo = () => {
    closeModal();
  };


  return (
    <SafeAreaView style={styles.container}>
      
      <Header title="New Group" onPressBack={handleBack} />

      <GroupHeaderComponent
        onGroupNameChange={handleGroupNameChange}
        onGroupImageUriChange={handleGroupImageUriChange}
      />
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
      <ConfirmModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Confirmation"
        description="Are you sure you want to create this group?"
        leftButtonTitle="No"
        rightButtonTitle="Yes"
        onLeftButtonPress={handleNo}
        onRightButtonPress={handleCreateGroup}
      />
      
      {toastVisible && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ButtonConfirm
        disabled={false}
        title="CREATE GROUP"
        onPress={() => handleFinish()}
      />

    </SafeAreaView>
  );
};

const Toast = ({ visible, message }) => {
  if (visible) {
    return (
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
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
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CreateNewGroup;
