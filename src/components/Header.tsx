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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 20,
        paddingVertical: 20,
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


