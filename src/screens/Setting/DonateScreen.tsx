import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import {
  gaboPic,
  shahabPic,
  walterPic,
  gianlockPic,
  francescoPic,
  xIcon,
  githubIcon,
  nostrIcon,
} from "@src/data";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "@styles/styles";
import Header from "@comps/Header";


const DonateScreen = ({ navigation }) => {
  // You can add your action for the donate button here
  const handleDonate = () => {
    // For example, you might want to open a web link
    Linking.openURL("lightning://splitsats@getalby.com");
  };

  // Social media icon press handler
  const handleSocialMediaPress = (platform) => {
    // Open a link depending on the platform
    switch (platform) {
      case "X":
        Linking.openURL("https://x.com/splitsats");
        break;
      case "Nostr":
        Linking.openURL("nostr://npub1jwver7w272as2eaneruv3pg8he3u4fw9v8xukus5qealwv5pdymqp7qgvy");
        break;
      case "Github":
        Linking.openURL("https://github.com/SplitSats/SplitSats");
        break;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="DONATION" onPressBack={handleBack} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.header}>Donate</Text> */}
        <Text style={styles.description}>
          SplitSats is an open source project developed by enthusiasts nerds
          during their free time! 😁
        </Text>
        <Text style={styles.description}>
          Donations are always appreciated! ❤️
        </Text>
        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.donateButtonText}>⚡ DONATE</Text>
        </TouchableOpacity>
        <Text style={styles.subheader}>Contributors</Text>
        <View style={styles.contributors}>
          <Image source={gaboPic} style={styles.contributorImage} />
          <Image source={gianlockPic} style={styles.contributorImage} />
          <Image source={walterPic} style={styles.contributorImage} />
        </View>
        <View style={styles.contributors}>
          <Image source={francescoPic} style={styles.contributorImage} />
          <Image source={shahabPic} style={styles.contributorImage} />
        </View>
        <View style={styles.footer}>
        <Text style={styles.followUs}>FOLLOW US</Text>
        <View style={styles.socialMedia}>
          <TouchableOpacity onPress={() => handleSocialMediaPress("X")}>
            <Image source={xIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaPress("Nostr")}>
            <Image source={nostrIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaPress("Github")}>
            <Image source={githubIcon} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Assuming a black background
    alignItems:'center'
  },
  contentContainer: {
    padding: 20,
    alignItems:'center',
    flex:1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    alignSelf:'center'
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },
  donateButton: {
    marginTop:20,
    backgroundColor: "#3282B8", // Button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 50,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 30,
    alignSelf: "center",
  },
  contributors: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  contributorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal:20,
  },
  followUs: {
    fontSize: 12,
    color: SECONDARY_COLOR,
    alignSelf: "center",
    marginBottom: 20,
  },
  socialMedia: {

    flexDirection: "row",
    alignSelf: "center",
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center', 
  },
});

export default DonateScreen;
