import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { l, err } from '@log';
import { useUserProfileStore } from '@store'
import { createWallet, getWallet, PRIVATE_KEY_HEX, PUBLIC_KEY_HEX, NPUB, NSEC } from '@store/secure';

const UserProfile = ({ dataStore }) => {
	// const ndk = useNDK();
	const [ndk, setNdk] = useState(null);
	// const user = useUser()
	// const profile = useProfile(user?.pubkey)
	// const profileContent = profile?.content || {}

	const { userProfile, setUserProfile, clearUserProfile } = useUserProfileStore();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				if (dataStore === 'nostr') {
					// Use Nostr profile
					if (!ndk) {
						throw new Error('NDK not initialized');
					}
					const userNpub = await getWallet(NPUB);
					if (!userNpub) {
						l('UserPublicKey not found in local storage');
					}
					l('userNpub:', userNpub);
					const user = ndk.getUser({ npub: userNpub });
					const userProfile = await user.fetchProfile();
					if (!userProfile) {
						err('User profile not found');
					}
					setUserProfile(userProfile);
					console.log(user.profile);
				} 
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
		marginTop:50,
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
		borderWidth: 2,
		borderColor: '#FFFFFF',
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
