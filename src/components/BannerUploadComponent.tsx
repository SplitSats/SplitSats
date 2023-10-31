import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";

type BannerUploadComponentProps = {
  imageUri: string | null;
  setImageUri: React.Dispatch<React.SetStateAction<string | " ">>;
};
const BannerUploadComponent: React.FC<BannerUploadComponentProps> = ({
  imageUri,
  setImageUri,
}) => {
    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    
  };
  
  return (
    
  <View style={styles.BannerContainer}> 
    {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.BannerIcon} />
          ) : (
      <IconButton
        icon="camera-plus"
        style={styles.BannerIcon}
        iconColor={MD3Colors.neutral90}
        size={60}
        onPress={pickImage}
      />)}
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    height: 130,
    backgroundColor: "#333A4A",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 80,
    marginTop: 20,
  },
  BannerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#333A4A",
    alignSelf: "center",
  },
  BannerIcon: {
    paddingTop: 10,
    alignSelf: "center",
  },
});

export default BannerUploadComponent;
