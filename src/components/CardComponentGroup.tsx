import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FILL_CARD_COLOR } from "@styles/styles";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { truncateNpub } from '@nostr/util'

const GroupCardComponent= ({ group, onPress, ...props }) => {
  
  const [groupPressed, setgroupPressed] = useState('');
  
  useEffect(() => {
    setgroupPressed(group);
  }, [group]);

  const handlePress = () => {
    if (onPress) {
      onPress({ groupPressed });
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      {...props}
    >
      <Image source={{ uri: group?.image }} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group?.name}</Text>
        <Text style={styles.debt}>Settled up ⚡</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: FILL_CARD_COLOR,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  groupImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginRight: 10,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  debt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
});

export default GroupCardComponent;
