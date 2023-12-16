import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";
import { l } from "@log";

type ImageUploadComponentProps = {
  imageUri: string | null;
  setImageUri?: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  imageUri,
  setImageUri,
}) => {

  const [generatedRandomRobotImage, setGeneratedRandomRobotImage] = useState(false);
  
  const generateRandomRobotImage = async () => {
	  // Replace 'robohash.org' with 'robohash.io' if you prefer the newer version.
    if(!setImageUri) return;
    
	  const text = Math.random().toString(36).substring(2);
	  const baseUrl = 'https://robohash.org/';
	  const imageUrl = `${baseUrl}${text}.png?set=set3`;
	  l('New profile robot imageUrl:', imageUrl);
	  setImageUri(imageUrl);
	  return imageUrl;
	};
  useEffect(() => {
    if (!imageUri && !generatedRandomRobotImage){
      generateRandomRobotImage();
      setGeneratedRandomRobotImage(true);
    }
  }
  , []);

  const uploadImage = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        name: "image", 
        uri: imageData.uri,
        type: 'image/jpeg', 
      });
  
      const response = await fetch('https://nostrimg.com/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers if required
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.url; // Return the URL from the response
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  
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
        <TouchableOpacity onPress={generateRandomRobotImage}>
          <Image source={{ uri: imageUri }} style={styles.photoIcon} />
        </TouchableOpacity>

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
