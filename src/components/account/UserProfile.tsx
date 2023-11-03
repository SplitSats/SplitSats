import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { nip19 } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AsyncStore } from '@src/storage/store/AsyncStore';
import { useNDK } from '@src/context/NDKContext';
import { l, err } from '@log';
import { IProfileContent } from '@src/model/nostr';
import { store } from '@store';	
import { STORE_KEYS } from '@store/consts';
import { NDKUser } from '@nostr-dev-kit/ndk';

const UserProfile = ({ }) => {
	const [userProfile, setUserProfile] = useState<IProfileContent | null>(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				
				const storedUserProfile = await store.get(STORE_KEYS.userProfile);
				l('Stored user profile:', storedUserProfile);
				if (!storedUserProfile) {
					err('User profile not found');
				}
				await setUserProfile(JSON.parse(storedUserProfile));
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchUserProfile();
	}, []);

	return (
		<View style={styles.header}>
			<View style={styles.headerContent}>
				<View style={styles.userInfo}>
					<Text style={styles.welcome}>Hello, {userProfile?.name}</Text>
					<Text style={styles.subtitle}>Split your Sats.</Text>
				</View>
				{userProfile?.picture ? (
					<Image source={{ uri: userProfile?.picture }} style={styles.userPhoto} />
				) : (
					<Image source={require('@assets/logo/Splitsats_Logo_W.png')} style={styles.userPhoto} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: '20%',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
	},
	userPhoto: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth:2,
    	borderColor:'#FFFFFF'

	},
	userInfo: {
		flex: 1,
		marginLeft: 20,
	},
	welcome: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
	},
});

export default UserProfile;
