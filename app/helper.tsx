import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const helper = () => {
  return (
    <View style={styles.container}>
      <Text>helper</Text>
      <Link href="/">Return to main</Link>
    </View>
  );
};

export default helper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    padding: 5,
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "lightgray",
  },
});
