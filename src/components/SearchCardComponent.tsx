import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, FILL_CARD_COLOR } from "@styles/styles";
import { CheckBox } from "react-native-elements";
import { truncateNpub } from '@nostr/util'
// import Swipeable from "react-native-swipeable";

const SearchCardComponent = ({
  contact,
  onSelectionChange,
  isSelected,
  onRemove,
  ...props
}) => {
  const [selected, setSelected] = useState(isSelected);

  const handlePress = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);

    if (onSelectionChange) {
      onSelectionChange(contact, newSelectedState);
    }
  };
  const handleRemove = () => {
    if (onRemove) {
      onRemove(contact);
    }
  };

  // Render the component only if 'contact' exists and has a 'profile' property
  if (!contact || !contact.profile) {
    return null;
  }
  const swipeableButtons = [
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={handleRemove}
    >
      <Text style={styles.deleteButtonText}>Remove</Text>
    </TouchableOpacity>
  ];

  return (
    // <Swipeable rightButtons={swipeableButtons}>
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      {...props}
    >
      <Image source={{ uri: contact.profile.image }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{contact.username}</Text>
        <Text style={styles.userPublicKey}>{truncateNpub(contact.npub)}</Text>
      </View>
      <CheckBox
        center
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        uncheckedColor={'grey'}
        checkedColor={SECONDARY_COLOR}
        checked={selected}
        onPress={handlePress}
      />
    </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
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
  userPublicKey: {
    fontSize: 14,
    color: "grey",
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

export default SearchCardComponent;
