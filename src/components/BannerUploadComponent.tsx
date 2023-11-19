import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";
import axios from "axios";

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
  
  const getRandomBannerImage = async () => {
    const url = 'https://source.unsplash.com/random/800x200';
    try {
      await axios.get(url).then((response) => {
        setImageUri(response.request.responseURL);
      });
    } catch (error) { 
      console.error('Error fetching random banner image:', error)
    }

  };
  

  return (
    
  <View style={styles.BannerContainer}> 
    {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.BannerIcon} />
          ) : (
      // <IconButton
      //   icon="camera-plus"
      //   style={styles.BannerIcon}
      //   iconColor={MD3Colors.neutral90}
      //   size={60}
      //   onPress={getRandomBannerImage}
      // />)}
      <Image source={require('@assets/logo/Splitsats_name_W.png')} style={styles.bannerImage} />
    )}
  </View>
  );
};
const styles = StyleSheet.create({
  
  BannerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#333A4A",
    alignSelf: "center",
  },
  BannerIcon: {
    paddingTop: 10,
    alignSelf: "center",
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: '100%',
    height: 100,
  },
});

export default BannerUploadComponent;
