import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import CancelIcon from "@assets/icon/Cancel.png";
import QRIcon from "@assets/icon/QR-code.png";
import SearchIcon from "@assets/icon/Search.png";

const SearchBar = ({ searchTerm, setSearchTerm, handleCancel, setScannerOpen, isTyping }) => {
  return (
    <View style={styles.searchSection}>
      <Image source={SearchIcon} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="npub, username, NIP05"
        placeholderTextColor={"grey"}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(searchTerm.length > 0)}
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
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK_GREY,
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
  qrCodeIcon: {
    marginRight: 20,
    padding: 10,
    width: 15,
    height: 15,
  },
});

export default SearchBar;
