import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from "@comps/Header";

const GroupDetailsScreen = ({ navigation, route }) => {
  const { group } = route.params;
  const [selectedTab, setSelectedTab] = useState('Members'); // Initial tab selected

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Header title="GROUP DETAILS" onPressBack={handleBack} />
      {/* <UserProfile/> */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Members' && styles.selectedTab]}
          onPress={() => handleTabChange('Members')}
        >
          <Text style={styles.tabText}>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Expenses' && styles.selectedTab]}
          onPress={() => handleTabChange('Expenses')}
        >
          <Text style={styles.tabText}>Expenses</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === 'Members' && (
          <View>
            {/* Your Members content goes here */}
            <Text>Members Content</Text>
          </View>
        )}

        {selectedTab === 'Expenses' && (
          <View>
            {/* Your Expenses content goes here */}
            <Text>Expenses Content</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  tab: {
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: 'bold',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GroupDetailsScreen;
