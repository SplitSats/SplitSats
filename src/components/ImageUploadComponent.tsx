import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";

type ImageUploadComponentProps = {
  imageUri: string | null;
  setImageUri: React.Dispatch<React.SetStateAction<string | " ">>;
};
const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  imageUri,
  setImageUri,
}) => {
  const [image, setImage] = useState("");
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
      setImage(result.assets[0].uri);
    }
  };
  //    <View style={styles.container}>
  return (
    <View style={styles.PhotoContainer}>
    <IconButton
      icon="camera-plus"
      iconColor={MD3Colors.neutral90}
      style={styles.photoIcon}
      size={30}
      onPress={pickImage}
    />
    {image && <Image source={{ uri: image }} />}
  </View>
    
  );
};
//<Button title = 'add' onPress={pickImage} />
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