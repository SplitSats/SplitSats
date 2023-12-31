import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { settingData ,arrowIcon } from "@src/data";
import ImageUploadComponent from "@comps/ImageUploadComponent";
import BannerUploadComponent from "@comps/BannerUploadComponent";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";

import { useUserProfileStore, useContactManagerStore, useGroupManagerStore } from '@store';

import { use } from "i18next";
import { handleLogout } from "@comps/ButtonLogOut";


const AccountScreen = ({ navigation }) => {
  const [bannerImageUri, setBannerImageUri] = useState('');
	const [profileImageUri, setProfileImageUri] = useState('');
  const { clearContactManager } = useContactManagerStore();
  const { clearGroupManager } = useGroupManagerStore();

	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();
  
  useEffect(() => {
    console.log(userProfile);
    if (userProfile) {
      setBannerImageUri(userProfile.banner);
      setProfileImageUri(userProfile.picture);
    }
  }, 
  [userProfile]);

  const handleSettings = (item) => {
    console.log(item);
    if (item.text === "Log Out") {
      Alert.alert(
        "LOG OUT",
        "Are you sure you want to LogOut?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "LOG OUT",
            onPress: async () => {
              await handleLogout();
              await clearUserProfile();
              await clearContactManager();
              await clearGroupManager();
              navigation.navigate("Authentication");
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate(item.pageName);
    }
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.profileLinkList}
      onPress={() => handleSettings(item)}
    >
      <Image
        source={item.Image}
        resizeMode="contain"
        style={styles.profileLinkImg}
      />
      <Text style={styles.profileLinkText}>{item.text}</Text>
	  <View style={{ flex: 1 }}/>
	  <Image
        source={arrowIcon}
        resizeMode="contain"
        style={styles.profileArrowImg}
      />
    </TouchableOpacity>
  );

  return (
    // Add here settings for profile, relays, wallet, logout
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>YOUR ACCOUNT</Text>
      <View style={styles.containerPhotos}>
        <BannerUploadComponent imageUri={bannerImageUri} setImageUri={setBannerImageUri} />
        <ImageUploadComponent imageUri={profileImageUri} setImageUri={setProfileImageUri} />  
        <Text style={styles.userId}>{userProfile.profile?.displayName}</Text>
      </View>
      <Text style={styles.title2}>Settings</Text>
      <View style={styles.flatlistView}>
        <FlatList data={settingData} renderItem={renderItem} bounces={false} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerPhotos: {
    flex: 0,
    width: "100%",
    height: 130,
    backgroundColor: "#333A4A",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 80,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    color: "white",
    backgroundColor: "#333A4A",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start", // Aligns text to the left
    marginLeft: "10%",
    color: "#B0B0B0",
    marginBottom: 8, // Adjust as per spacing required between label and input
  },
  button: {
    position: "absolute",
    borderRadius: 25,
    backgroundColor: "#3282B8", // Background color of the button
    width: "80%",
    height: 50,
    alignSelf: "center",
    overflow: "hidden",
    bottom: 20,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    color: "#000000", // Text color
  },
  userId: {
    flexDirection: "row",
    bottom: 30,
    color: SECONDARY_COLOR,
  },
  title2: {
    fontSize: 24,
    color: "white",
    bottom: 20,
  },
  profileLinkList: {
	width:"100%",
    flexDirection: "row",
    paddingVertical: 15,// This will push the arrow to the end
// This will vertically center align items in the container
	
  },
  profileLinkText: {
    lineHeight: 23,
    fontSize: 18,
    color: "white",
    paddingLeft: 15,
	flexShrink: 1,
  },
  profileLinkImg: {
    width: 30,
    height: 30,
  },
  profileLinkListContent: {
    paddingHorizontal: 20,
  },
  flatlistView:{
	paddingLeft:30,
	alignSelf:'flex-start',
	width: '100%'
  },
  profileArrowImg: {
    width: 20,
    height: 20,
	marginRight:20,
  },
});
export default AccountScreen;
