import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, MD3Colors } from "react-native-paper";
import { err, l } from "@log";

type BannerUploadComponentProps = {
  imageUri: string | null;
  setImageUri: React.Dispatch<React.SetStateAction<string | null>>;
};

const BANNER_IMAGE_PLACEHOLDER = require('@assets/logo/Splitsats_name_W.png');

const BannerUploadComponent: React.FC<BannerUploadComponentProps> = ({
  imageUri,
  setImageUri,
}) => {
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getRandomBannerImage = async () => {
    const url = 'https://source.unsplash.com/random/800x200';
    setImageUri(url);
    return url;
  };

  useEffect(() => {
    if (!imageUri){
      l('Banner image not set, fetching random banner image');
      getRandomBannerImage();
    }
  }, [imageUri]);


  return (
    <View style={styles.bannerContainer}>
      {imageUri ? (
        <TouchableOpacity onPress={getRandomBannerImage}>
          <Image source={{ uri: imageUri }} style={styles.bannerImage} />
        </TouchableOpacity>

      ) : (
        <IconButton
          icon="camera-plus"
          style={styles.bannerIcon}
          iconColor={MD3Colors.neutral90}
          size={60}
          onPress={getRandomBannerImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#333A4A",
    alignSelf: "center",
  },
  bannerIcon: {
    paddingTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 130,
  },
});

export default BannerUploadComponent;
