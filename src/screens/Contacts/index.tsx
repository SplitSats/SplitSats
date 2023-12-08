import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

import UserProfile from '@comps/account/UserProfile';
import { useUserProfileStore, useContactManagerStore } from '@store';
// import { styles } from '@styles/styles';
import { ContactManager } from '@src/managers/contact';
import { l, err } from '@log';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
// import { UserCardComponent } from '@comps/UserCardComponent';
import MemberCardComponent from "@comps/MemberCardComponent";
import PaymentModal from '@comps/PaymentModal'; 


const ContactScreen = ({ navigation }) => {
  const { setContactManager, getContactManager, initializeContactManager } = useContactManagerStore();
  const [contacts, setContacts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Friends');
  const TAG = '[ContactScreen] ';
  const contactManager = useContactManagerStore((state) => state.getContactManager());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null); // State to hold the selected contact

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePay = (amount) => {
    // Handle payment logic here
    console.log('Payment initiated with amount:', amount);
    setIsModalVisible(false);
  };


  useEffect(() => {
    const initContactManager = async () => {
      try {
        
        if (!contactManager) {
          // If not found in storage, initialize a new one
          await initializeContactManager();
          l(TAG, "Contact manager initialized");
        } 

        // Fetch contacts from contactManager
        if (contactManager ) {
          const fetchedContacts = await contactManager.getContacts() || [];
          setContacts(fetchedContacts);
          l('Fetched contacts:', fetchedContacts);
        } else {
          err('Contact manager or getContacts method is undefined.');
        }
      } catch (error) {
        console.error('Error initializing contact manager:', error);
      }
    };
    initContactManager();
  }, []);
  
  // Handle when a contact card is pressed
  const handleZap = (contact) => {
    setSelectedContact(contact); // Set the selected contact when a contact card is pressed
    toggleModal(); // Show the payment modal
  };


  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
    // You can implement logic here to switch between "Friends" and "Debts" tabs
  };
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Friends' && styles.selectedTab]}
        onPress={() => handleTabChange('Friends')}
      >
        <Text style={styles.tabText}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Debts' && styles.selectedTab]}
        onPress={() => handleTabChange('Debts')}
      >
        <Text style={styles.tabText}>Debts</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <UserProfile/>
      {/* Rest of your content */}
      <View style={styles.contactListContainer}>
        {renderTabs()}
        {/* Conditionally render based on selectedTab */}
        {selectedTab === 'Friends' && (
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
            <MemberCardComponent
                contact={item}
                onPress={() => handleZap(item)} // Pass the contact data to handleZap
              />
            )}
            keyExtractor={(item) => item.npub}
          />
        )}
        <PaymentModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          // onPay={handlePay}
          contact={selectedContact} 
        />
        {/* Add another conditional section for 'Debts' tab */}
        {selectedTab === 'Debts' && (
          <View>
            <Text>Debts content goes here...</Text>
          </View>
        )}
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  // New styles for the contact list
  contactListContainer: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Change the background color as needed
    marginTop: '35%', // Adjust the marginTop to position the contact list below the UserProfile
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default ContactScreen;
