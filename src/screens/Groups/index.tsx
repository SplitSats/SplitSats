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
	Modal,
	Image, 
	Platform,
	StatusBar,
	Alert,
} from "react-native";
import UserProfile from '@comps/account/UserProfile'
import { Group, GroupManager } from '@src/managers/group';
import { useUserProfileStore, useContactManagerStore, useGroupManagerStore } from '@store'
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, FILL_CARD_COLOR } from "@styles/styles";
import { l, err } from '@log';


const GroupsScreen = ({ navigation }) => {

	const groupManager = useGroupManagerStore((state) => state.getGroupManager());
	const [groups, setGroups] = useState([]);


	useEffect(() => {
		const fetchGroups = async () => {
			try {
				if (!groupManager) {
					l('Group manager not found');
					return;
				}
				const fetchedGroups = await groupManager.getGroups() || [];
				setGroups(fetchedGroups);
				l('Fetched groups:', fetchedGroups);
			} catch (error) {
				console.error('Error fetching groups:', error);
			}
		}
		fetchGroups();
	}, [groupManager]);
	
	const handleGroupPress = (group) => {
		navigation.navigate('GroupDetails', { group });
	};

	const renderGroupCard = ({ item }) => (
		<TouchableOpacity onPress={() => handleGroupPress(item)}>
		  <View style={styles.groupCard}>
			{/* Use an actual image for the group */}
			<Image source={item.groupImage} style={styles.groupImage} />
			<Text style={styles.groupName}>{item.name}</Text>
		  </View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<UserProfile/>	
			<View style={styles.groupListContainer}>
				<FlatList
					data={groups}
					ListHeaderComponent={<View style={styles.divider} />} // Add a divider before the list
					renderItem={renderGroupCard}
					keyExtractor={(item) => item.npub}
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
