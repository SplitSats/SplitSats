import React, { useState, useEffect } from 'react'
import { IProfileContent } from '@src/model/nostr'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { store } from '@store'
import { STORE_KEYS } from '@store/consts'
import { truncateNpub } from '@nostr/util'


const CreateAccountWrap = ({ userProfile }) => {
  
	const [userInputs, setUserProfile] = useState<IProfileContent>(userProfile);
	const [userNpub, setUserNpub] = useState('');

  useEffect(() => {
    const fetchUserNpub = async () => {
      try {
        const userNpub = await store.get(STORE_KEYS.npub);
        if (!userNpub){
          console.log('UserPublicKey not found in local storage')
        }
        const truncatedNpub = truncateNpub(userNpub);
        setUserNpub(truncatedNpub || 'npbu....');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    fetchUserNpub()
  }
  , [])


  return (
      <View>
        <View style={styles.photoContainer} >

          {userInputs.banner ? (
            <Image source={{ uri: userInputs.banner }} style={styles.bannerImage} />
          ) : (
            <Image source={require('@assets/logo/Splitsats_name_W.png')} style={styles.bannerImage} />
          )}
          <Image source={{ uri: userInputs.picture }} style={styles.profileImage} />
        </View>
          <Text style={styles.noteText}>{userInputs.username}</Text>
          <Text style={styles.noteText}>{userNpub}</Text>
          <Text style={styles.noteText}>{userInputs.lud16}</Text>
          <Text style={styles.noteText}>{userInputs.about}</Text>
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
    borderWidth:2,
    borderColor:'#0F172A'
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