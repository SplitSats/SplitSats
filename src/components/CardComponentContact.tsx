import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FILL_CARD_COLOR } from "@styles/styles";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { truncateNpub, getNostrUsername } from '@nostr/util'

const ContactCardComponent = ({ contact, onPress }) => {
  
  const [contactPressed, setContactPressed] = useState('');
  const [user, setUser] = useState('');
  
  useEffect(() => {
    setContactPressed(contact);
  }, [contact]);

  const handlePress = () => {
    if (onPress) {
      onPress({ contactPressed });
    }
  };

  return (
    <View style={styles.cardContainer}> 
        <Image
          source={{ uri: contact.profile.image }}
          style={styles.profileImage}
        />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{getNostrUsername(contact.profile)}</Text>
        <Text style={styles.npub}>{truncateNpub(contact.npub)}</Text>
      </View>
      {/* A little button with a thunder icon for paying  */}
      <TouchableOpacity style={styles.payContainer} onPress={handlePress}>
        <Text style={styles.payText}>Zap ⚡</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: FILL_CARD_COLOR,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  npub: {
    fontSize: 14,
    color: "grey",
  },
  payContainer: {
    backgroundColor: SECONDARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: DARK_GREY,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: 'white',
    fontSize: 14,
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR, // Background color for placeholder
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default ContactCardComponent;
