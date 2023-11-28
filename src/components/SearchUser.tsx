import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FILL_CARD_COLOR } from "@styles/styles";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed

const SearchUser = ({ searchTerm, setSearchTerm, onIconPress }) => {
  const handleInputChange = (text) => {
    setSearchTerm(text);
    // Sort the users based on the text provided
    // Implement sorting logic here
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friend..."
        placeholderTextColor={"grey"}
        value={searchTerm}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity onPress={onIconPress}>
        <View style={styles.addButton}>
          <Ionicons name="person-add-outline" size={24} color="grey" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 35,
    backgroundColor: FILL_CARD_COLOR,
    borderRadius: 20,
    padding: 10,
    color: "white",
  },
  addButton: {
    marginLeft: 10,
  },
});

export default SearchUser;
