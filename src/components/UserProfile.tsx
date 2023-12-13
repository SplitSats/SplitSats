// UserProfile.js
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Clipboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Import the QRCode component
import { useUserProfileStore } from '@store';
import { getWallet, NPUB } from '@store/secure';
import { l, err } from '@log';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@src/styles/styles';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ndk, setNdk] = useState(null);
  const [fetching, setFetching] = useState(false);
  const { userProfile, setUserProfile } = useUserProfileStore();

  
	useEffect(() => {
		const fetchUserProfile = async () => {
			// Use Nostr profile
			try {
				if (!ndk) {
					throw new Error('NDK not initialized');
				}
				const userNpub = await getWallet(NPUB);
				if (!userNpub) {
					l('UserPublicKey not found in local storage');
				}
				const user = ndk.getUser({ npub: userNpub });
				const userProfile = await user.fetchProfile();
				if (!userProfile) {
					err('User profile not found');
				}
				setUserProfile(userProfile);
				console.log("Fetched Profile", user.profile);
			} catch (error) {
				// console.warn('Error fetching user profile:', error);
			}
		};
		fetchUserProfile();
	}, [userProfile]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    // Show some feedback to the user that the text has been copied
    // This can be a toast, alert, or any other UI feedback
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openModal}>
        <View style={styles.headerContent}>
			<View style={styles.userInfo}>
				<Text style={styles.welcome}>Hello, {userProfile?.display_name}</Text>
				<Text style={styles.subtitle}>Split your Sats.</Text>
			</View>
			{userProfile?.picture ? (
				<Image source={{ uri: userProfile?.picture }} style={styles.userPhoto} />
			) : (
				<Image source={require('@assets/logo/Splitsats_Logo_W.png')} style={styles.userPhoto} />
			)}
        </View>
      </TouchableOpacity>
	  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.userInfo}>
              <Image source={{ uri: userProfile?.picture }} style={styles.modalUserPhoto} />
              <Text style={styles.modalDisplayName}>{userProfile?.display_name}</Text>
              <Text style={styles.modalNpub}>{userProfile?.npub}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(userProfile?.npub)}
              >
                <Text style={styles.buttonText}>Copy NPUB</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.qrCodeContainer}>
              <QRCode value={userProfile?.npub} size={250} />
            </View>

            <TouchableOpacity style={styles.roundButton} onPress={closeModal}>
              <Text style={[styles.buttonText, { color: 'white' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
	marginTop: 50,
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
	alignItems: 'center',
	marginBottom: 20,
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
  
  // New styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: SECONDARY_COLOR,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalUserPhoto: {
    width: 100,
    height: 100,
	backgroundColor: 'white',
	borderWidth: 2,
	borderColor: '#FFFFFF',
    borderRadius: 50,
    marginBottom: 10,
  },
  modalDisplayName: {
    fontSize: 18,
    fontWeight: 'bold',
	color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  modalNpub: {
    marginBottom: 15,
  },
  copyButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  roundButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

});

export default UserProfile;