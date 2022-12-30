import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LogOut = () => {
  return (
    <View style={styles.container}>
      <Text>List of Alerts related to bike/riders</Text>
      <Text>Simialr to messaging screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogOut;
