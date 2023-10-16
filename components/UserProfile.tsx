import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NDK from "@nostr-dev-kit/ndk";
import { RELAYS, USER_NPUB } from '../constants/config';
import { styles } from '../styles/styles';
import { useNDK } from '../context/NDKContext';
import { nip19 } from 'nostr-tools';


const UserProfile = ({ }) => {
    const ndk = useNDK();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            if (!ndk) {
                throw new Error("NDK not initialized");
            }
            
            const userPublicKey = AsyncStorage.getItem('userPublicKey') as string;
            if (!userPublicKey){
              console.log("UserPublicKey not found in local storage")
            }
            console.log("UserPublicKey:", userPublicKey);
            const userNpub = nip19.npubEncode(userPublicKey);
            const user = ndk.getUser({ npub: userNpub });
            const userProfile = await user.fetchProfile();
            if (!userProfile) {
              throw new Error("User profile not found");
            }
            setUserProfile(userProfile);
            console.log(user.profile);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        fetchUserProfile();
      }, [ndk]);


    return (
        <View style={styles.container}>
            <Text style={styles.bigBlue}>Hi {userProfile?.name}!</Text>
            <Text>{userProfile?.about}</Text>
            <Text>{userProfile?.lud16}</Text>
        </View>
    );

};

export default UserProfile;