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
  return (
    <View style={styles.container}>
      <View style={styles.BannerContainer}> 
      <IconButton
        icon="camera-plus"
        style={styles.BannerIcon}
        iconColor={MD3Colors.neutral90}
        size={60}
        onPress={pickImage}
      />
      {image && <Image source={{ uri: image }} />}
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
    </View>
      
    </View>
  );
};
//<Button title = 'add' onPress={pickImage} />
const styles = StyleSheet.create({
  container: {
    flex: 0,
    width:'100%',
    height:130,
    backgroundColor: '#333A4A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 80,
    marginTop:20,
  },
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
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50, // To make it rounded
    marginLeft: 20, // Add some margin between the text and image
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0000FF", // This is a placeholder color. Adjust it to match the exact shade you want.
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  PhotoContainer: {
    padding: 0,
    alignSelf: "flex-start",
    marginLeft: "7%",
  },
  BannerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: '#333A4A',
    alignSelf: 'center',
  },
  BannerIcon:{
    paddingTop:10,
    alignSelf: "center",
  }
});

export default ImageUploadComponent;
