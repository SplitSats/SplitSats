import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";
import { l } from "@log";

type ImageUploadComponentProps = {
  imageUri: string | null;
  setImageUri: React.Dispatch<React.SetStateAction<string | " ">>;
};

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  imageUri,
  setImageUri,
}) => {
  
  const generateRandomRobotImage = async () => {
	  // Replace 'robohash.org' with 'robohash.io' if you prefer the newer version.
	  const text = Math.random().toString(36).substring(2);
	  const baseUrl = 'https://robohash.org/';
	  const imageUrl = `${baseUrl}${text}.png`;
	  l('New profile robot imageUrl:', imageUrl);
	  setImageUri(imageUrl);
	  return imageUrl;
	};

  useEffect(() => {
    generateRandomRobotImage();
  }
  , []);
  
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
    <View style={styles.PhotoContainer}>
      {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.photoIcon} />
          ) : (
      <IconButton
        icon="camera-plus"
        iconColor={MD3Colors.neutral90}
        style={styles.photoIcon}
        size={30}
        onPress={generateRandomRobotImage}
      />)}
    </View>
    
  );
};

const styles = StyleSheet.create({
  photoIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#333A4A',
    borderWidth:2,
    borderColor:'#0F172A'
  },
  PhotoContainer: {
    padding: 0,
    alignSelf: "flex-start",
    marginLeft: "7%",
  },
});

export default ImageUploadComponent;
