import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { useState } from "react";
import { CheckBox } from "react-native-elements";
const UserCardComponent = ({ userName, userPublicKey, profileImage }) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setSelected(!selected)}
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
  userPublicKey: {
    fontSize: 14,
    color: "grey",
  },
});

export default UserCardComponent;
