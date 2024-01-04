import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { DARK_GREY, PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { truncateNpub } from '@nostr/util'
import { l } from '@log'
import  QRCodeScreen from '@comps/QRcode' 
import { getWallet, NPUB } from '@store/secure';

const CreateAccountWrap = ({ userProfile }) => {
  
  // TODO: Show a QR code of the npub, so friends can add you yet

	const [userInputs, setUserProfile] = useState<NostrProfileContent>(userProfile);
  
  const [userNpub, setUserNpub] = useState('');
	const [truncatedNpub, setTruncatedNpub] = useState('');
  
  useEffect(() => {
    const fetchUserNpub = async () => {

      const npub = await getWallet(NPUB);
      if (!npub){
        console.log('No npub found')
        return
      }
      if(!userNpub) {
        setUserNpub(npub)
      }
      let truncated = ''
      try {
        truncated = truncateNpub(userNpub);
      } catch (e) {
        console.log('Error truncating npub:', e)
      }
      // l('truncatedNpub:', truncated)
      setTruncatedNpub(userNpub !== "" ? truncated : 'npub...')
    }
    fetchUserNpub()
  }
  , [truncatedNpub])


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
          <Text style={styles.noteText}>{truncatedNpub}</Text>
          <Text style={styles.noteText}>⚡{userInputs.lud16}</Text>
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
    borderWidth: 3,
    borderColor:'#83A3EE',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 0,
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
    borderColor:'#0F172A',
    backgroundColor: DARK_GREY,
  },
  noteText: {
    color: 'white',
    paddingLeft:10,
    fontSize:16,
  },
  photoContainer:{
    marginBottom: '15%',
    width:'100%'
  }
});



export default CreateAccountWrap