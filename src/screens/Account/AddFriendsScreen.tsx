import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import CancelIcon from "@assets/icon/Cancel.png";
import QRIcon from "@assets/icon/QR-code.png";
import SearchIcon from "@assets/icon/Search.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import ConfirmButton from "@comps/ConfirmButton";
import QRCodeScreen from "@comps/account/QRcode";
import UserCardComponent from "@comps/UserCardComponent";

const AddFriendScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = {
    name: "SplitSatS",
    profileImage:
      "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const users = [
    {
      id: "1",
      name: "Gian Lock",
      publicKey: "npub1q6le8ppm0nz0g...",
      profileImage:
        "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Gabbo",
      publicKey: "npub1za03vbthdvstx...",
      profileImage:
        "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    // Handle your QR Code data here
  };
  const handleInputChange = (text) => {
    setSearchTerm(text);
    setIsTyping(text.length > 0);
  };

  const handleCancel = () => {
    setSearchTerm("");
    setIsTyping(false);
    setScanned(false);
  };
  return isScannerOpen ? (
    <QRCodeScreen 
    scanned = {scanned}
    handleFunc = {handleBarCodeScanned}
    setScannerOpen={setScannerOpen}
    />
    
    ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>ADD FRIENDS</Text>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome {user.name}</Text>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.searchSection}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="npub, username, NIP05"
          placeholderTextColor={"grey"}
          value={searchTerm}
          onChangeText={handleInputChange}
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
      
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserCardComponent
              userName={item.name}
              userPublicKey={item.publicKey}
              profileImage={item.profileImage}
            />
          )}
        />
      <ConfirmButton
        disabled={false}
        title="FINISH"
        onPress={() => navigation.navigate("Dashboard")}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 20,
  },
  scanText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: "20%",
  },
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
  preview: {
    flex: 1,
  },
  qrCodeIcon: {
    marginRight: 20,
    padding: 10,
    width: 15,
    height: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default AddFriendScreen;
