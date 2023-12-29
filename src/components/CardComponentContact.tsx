import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FILL_CARD_COLOR } from "@styles/styles";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { truncateNpub, getNostrUsername } from '@nostr/util'
import { l } from '@log';


const ContactCardComponent = ({ contact, onPress }) => {
  
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [npub, setNpub] = useState('');
  const [contactPressed, setContactPressed] = useState('');
  
  
  useEffect(() => {
    setContactPressed(contact);
  }, [contact]);

  useEffect(() => {
    setUserName(getNostrUsername(contact.profile));
    setImageUri(contact.profile?.image);
    setNpub(truncateNpub(contact.npub));
    l("userName: ", userName);  
  }, [contact]);


  const handlePress = () => {
    if (onPress) {
      onPress({ contactPressed });
    }
  };

  return (
    <View style={styles.cardContainer}>
      {imageUri !== '' && (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
      )}
      <View style={styles.userInfo}>
        {userName !== '' && (
          <Text style={styles.userName}>{userName}</Text>
        )}
        {npub !== '' && (
          <Text style={styles.npub}>{npub}</Text>
        )}  
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
  }
});

export default ContactCardComponent;
