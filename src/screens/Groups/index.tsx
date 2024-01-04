import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
	View,
	FlatList,
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	Image, 
	Platform,
	StatusBar,
	Alert,
} from "react-native";
import UserProfile from '@comps/UserProfile'
import { Group, GroupManager } from '@src/managers/group';
import { useUserProfileStore, useContactManagerStore, useGroupManagerStore } from '@store'
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, FILL_CARD_COLOR } from "@styles/styles";
import { l, err } from '@log';
import GroupCardComponent from '@comps/CardComponentGroup';
import { useNDK } from '@src/context/NDKContext';
import { getNostrEvents, getNostrFriends, decryptNostrEvent } from '@nostr';
import { truncateNpub, getNostrUsername } from '@nostr/util'

const GroupsScreen = ({ navigation }) => {
	const ndk =  useNDK();

	const { setGroupManager, getGroupManager, initializeGroupManager } = useGroupManagerStore();
	const groupManager = useGroupManagerStore((state) => state.getGroupManager());
	const [groups, setGroups] = useState([]);
	const TAG = '[GroupsScreen] ';
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		const initGroupManager = async () => {
		  try {
			
			if (!groupManager) {
			  // If not found in storage, initialize a new one
			  await initializeGroupManager();
			  l(TAG, "Group manager initialized");
			} 
	
			// Fetch groups from groupManager
			if (groupManager) {
				const fetchedGroups = await groupManager?.getGroups() || [];
				await setGroups(fetchedGroups);
				// l('Fetched groups:', fetchedGroups);
			} else {
			  err('Group manager or getGroups method is undefined.');
			}
		  } catch (error) {
			console.error('Error initializing group manager:', error);
		  }
		};
		initGroupManager();
	  }, []);
	
	
	  useEffect(() => {
		// Run the function initially
		const checkEvents = async () => {
			const friends = await getNostrFriends(ndk);
			//   l('Friends:', friends);
			  const friends_npubs = Array.from(friends).map((friend) => friend.pubkey);	
			  const events = await getNostrEvents(ndk, friends_npubs);
			  for (const event of events) {
				//   l('Event:', event.rawEvent());
				const decripted_content = await decryptNostrEvent(ndk, event);
				  
			  }
			  // Log events if found
			  if (events.size > 0) {
				l('Events found:', events?.size);
			  } else {
				l('No events found from friends.');
			  }
			
		  };	
		// Set interval to run checkEvents every 20 seconds
		const interval = setInterval(() => {
		  checkEvents();
		}, 30000); // 20 seconds in milliseconds
	
		// Clear interval on unmount to prevent memory leaks
		return () => clearInterval(interval);
	  }, []); // Run once on component mount

	  
	const handleGroupPress = (group) => {
		navigation.navigate('GroupDetails', { group });
	};

	return (
		<SafeAreaView style={styles.container}>
			<UserProfile/>	
			<View style={styles.groupListContainer}>
				<FlatList
					data={groups}
					renderItem={({ item }) => (
						<GroupCardComponent
							group={item}
							onPress={() => handleGroupPress(item)}
						/>
						)}
						keyExtractor={(item) => item.groupId}
					  />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: PRIMARY_COLOR,
	  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	groupListContainer: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR, // Change the background color as needed
		marginTop: '35%', // Adjust the marginTop to position the contact list below the UserProfile
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 20,
		paddingHorizontal: 20,
	  },
	header: {
	  color: SECONDARY_COLOR,
	  fontSize: 24,
	  fontWeight: 'bold',
	  textAlign: 'center',
	  marginVertical: 20,
	},
	divider: {
	  height: 1,
	  backgroundColor: DARK_GREY,
	},
	groupCard: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  paddingVertical: 16,
	  paddingHorizontal: 20,
	  borderBottomWidth: 1,
	  borderBottomColor: DARK_GREY,
	  backgroundColor: FILL_CARD_COLOR,
	},
	groupImage: {
	  width: 50,
	  height: 50,
	  marginRight: 20,
	  borderRadius: 25,
	  backgroundColor: SECONDARY_COLOR,
	},
	groupName: {
	  fontSize: 18,
	  color: SECONDARY_COLOR,
	  fontWeight: 'bold',
	},
  });
  

  
export default GroupsScreen
