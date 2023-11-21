import React from "react";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const TabBarIcon = ({ name, focused }) => {

  const svg = require('@assets/icon/lightning.svg');
  const activeColor = focused ? "blue" : "gray";

  return (
    <TouchableOpacity style={styles.container}>
      <SvgXml xml={svg} width={24} height={24} fill={activeColor} />
      <Text style={[styles.label, { color: activeColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
  },
});

export default TabBarIcon;
