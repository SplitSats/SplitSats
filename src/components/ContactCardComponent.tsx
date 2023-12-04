import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";


const ContactCardComponent = ({ userName, npub, profileImage, onPress, ...props  }) => {
  
  const handlePress = () => {
    if (onPress) {
      onPress({ userName, userPublicKey, profileImage });
    }
  };
  useEffect(() => {
    console.log(userName);
    console.log(npub);
    console.log(profileImage);
  }, []);

  return (
    
    <View style={styles.cardContainer}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.npub}>{npub}</Text>
      </View>
      {/* A little button with a thunder icon for paying  */}
      <TouchableOpacity style={styles.payContainer}>
        <Text style={styles.payText}>Pay</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: DARK_GREY,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  payText: {
    fontSize: 14,
    color: "white",
  },
  payContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: DARK_GREY,
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
});

export default ContactCardComponent;
