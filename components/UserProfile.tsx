import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NDK from "@nostr-dev-kit/ndk";
import { RELAYS, USER_NPUB } from '../constants/config';
import { styles } from '../styles/styles';
import { useNDK } from '../context/NDKContext';


const UserProfile = ({ }) => {
    const ndk = useNDK();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            if (!ndk) {
                throw new Error("NDK not initialized");
            }

            const user = ndk.getUser({ npub: USER_NPUB });
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