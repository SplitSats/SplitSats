import React, { useState, useEffect} from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ImageUploadComponent from '@comps/ImageUploadComponent';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";

const GroupHeaderComponent = ({ onGroupNameChange, onGroupImageUriChange }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImageUri, setGroupImageUri] = useState('');
  
  const getRandomImage = async () => {
    const url = 'https://source.unsplash.com/random/70x70';
    await setGroupImageUri(url);
    await onGroupImageUriChange(url)
    return url;
  };

  const getRandomName = async () => {
    const name = 'SatsSplitter' + Math.floor(Math.random() * 1000) + 1; 
    await setGroupName(name);
    await onGroupNameChange(name);
    return name;
  }

  useEffect(() => {
    getRandomImage();
    getRandomName();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <ImageUploadComponent imageUri={groupImageUri} setImageUri={setGroupImageUri}/>
      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group name"
        placeholderTextColor={'grey'}
        style={styles.input}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: PRIMARY_COLOR, 
  },
  input: {
    flex: 1,
    height:40,
    marginLeft: 10,
    color: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR, 
  },
});

export default GroupHeaderComponent;
