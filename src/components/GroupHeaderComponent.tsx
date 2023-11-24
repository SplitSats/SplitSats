import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ImageUploadComponent from '@comps/ImageUploadComponent';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";

const GroupHeaderComponent = ({ }) => {
  const [groupName, setGroupName] = useState('');
  const [profileImageUri, setProfileImageUri] = useState('');
  

  return (
    <View style={styles.headerContainer}>
      <ImageUploadComponent imageUri={"https://images.unsplash.com/photo-1682685796467-89a6f149f07a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      setImageUri={setProfileImageUri}/>
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
