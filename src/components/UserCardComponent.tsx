import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, FILL_CARD_COLOR } from "@styles/styles";
import { useState } from "react";
import { CheckBox } from "react-native-elements";


const UserCardComponent = ({ userName, userPublicKey, profileImage,onSelectionChange, ...props  }) => {
  const [selected, setSelected] = useState(false);
  const handlePress = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);

    // Call the passed in onSelectionChange function with the new selected state
    //We will use it inside CreatNewGroup when user click on a user to add
    //here we will just return the user with all of it's profile and the newSelectedState
    //this state will be check in CreateNewGroup to undrestand if the user is selected rn or deselected
    if (onSelectionChange) {
      onSelectionChange({ userName, userPublicKey, profileImage }, newSelectedState);
    }
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      {...props}
    >
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userPublicKey}>{userPublicKey}</Text>
      </View>
      <CheckBox
        center
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        uncheckedColor={'grey'}
        checkedColor={SECONDARY_COLOR}
        checked={selected}
        onPress={() => setSelected(!selected)}
      />
    </TouchableOpacity>
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
});

export default UserCardComponent;
