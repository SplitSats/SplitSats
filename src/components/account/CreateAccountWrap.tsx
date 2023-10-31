import React, { useState } from 'react'
import { IProfileContent } from '@src/model/nostr'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'

const CreateAccountWrap = ({ userProfile }) => {
  
	const [userInputs, setUserProfile] = useState<IProfileContent>(userProfile);

  return (
      <View>
        <View style={styles.photoContainer} >
          <Image source={{ uri: userInputs.bannerImage }} style={styles.bannerImage} />
          <Image source={{ uri: userInputs.profileImage }} style={styles.profileImage} />
        </View>
          <Text style={styles.noteText}>{userInputs.name}  {userInputs.username}</Text>
          <Text style={styles.noteText}>npbu....</Text>
          <Text style={styles.noteText}>{userInputs.email}</Text>
          <Text style={styles.noteText}>{userInputs.description}</Text>
      </View>
    );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width:'100%',
    borderWidth:3,
    borderColor:'#83A3EE',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    alignSelf:'flex-start',
  },
  bannerImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: 60,
    alignSelf: 'flex-start',
  },
  noteText: {
    color: 'white',
    paddingLeft:10,
    fontSize:16,
  },
  photoContainer:{
    marginBottom:50,
  }
});



export default CreateAccountWrap