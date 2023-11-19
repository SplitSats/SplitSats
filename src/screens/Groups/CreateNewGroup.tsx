import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import SearchIcon from "@assets/icon/Search.png";
import UserCardComponent from "@comps/UserCardComponent";
import GroupHeaderComponent from "@comps/GroupHeaderComponent";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import MemberCardComponent from "@comps/MemberCardComponent";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed

// this is user type is same with UserCardComponent
// For the sake of simplicity for Back-end developing

type User = {
  id: string;
  userName: string;
  userPublicKey: string;
  profileImage: string;
};

const CreateNewGroup = () => {
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const addMemberToGroup = (user, isSelected) => {
    setGroupMembers((prevMembers) => {
      const isAlreadyMember = prevMembers.some(
        (member) => member.userName === user.userName
      );

      if (isSelected && !isAlreadyMember) {
        // Add to group if not already included
        return [...prevMembers, user];
      } else if (!isSelected && isAlreadyMember) {
        // Remove from group if currently included
        return prevMembers.filter(
          (member) => member.userName !== user.userName
        );
      }

      // Return the previous members if there's no change
      return prevMembers;
    });
  };
  //USER EXAMPLE
  const users = [
    {
      id: "1",
      userName: "Gian Lock",
      userPublicKey: "npub1q6le8ppm0nz0g...",
      profileImage:
        "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      userName: "Gabbo",
      userPublicKey: "npub1za03vbthdvstx...",
      profileImage:
        "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <View style={styles.container}>
      <GroupHeaderComponent />
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={users}
        ListHeaderComponent={() => (
          <View>
            {/* This will render your group members */}
            <View style={styles.membersList}>
              {groupMembers.map((member) => (
                <MemberCardComponent
                  key={member.id}
                  name={member.userName}
                  profileImage={member.profileImage}
                />
              ))}
            </View>
            <Text style={styles.sectionTitle}>Your friends</Text>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search friend..."
                placeholderTextColor={'grey'}
                onChangeText={() => console.log('HandleSearch')}
              />
                <View style={styles.addButton}>
                <Ionicons name="person-add-outline" size={24} color="grey" />
                </View>
              </View>
              
              
              
          </View>
        )}
        renderItem={({ item }) => (
          <UserCardComponent
            userName={item.userName}
            profileImage={item.profileImage}
            userPublicKey={item.userPublicKey}
            onSelectionChange={addMemberToGroup}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  membersHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: PRIMARY_COLOR,
  },
  membersList: {
    flexDirection: "row",
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
    backgroundColor:DARK_GREY,
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
});

export default CreateNewGroup;
