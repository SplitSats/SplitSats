import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from "@styles/styles";

const HeaderComponent = ({ title, onPressBack }) => {
return (
    <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 10,
    },
    titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    },
});
    

export default HeaderComponent;


