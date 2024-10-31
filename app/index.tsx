import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex justify-center items-center content-center bg-blue-500 h-full">
      <Text>Entry Point</Text>
      <Link
        className="border border-1 rounded-xl p-3 mt-4 focus:bg-white"
        href="/helper"
      >
        <Text className="font-pregular">
          Would you like to jump helper page ?
        </Text>
      </Link>
      <Link
        className="border border-1 rounded-xl p-3 mt-4 focus:bg-white"
        href="/home"
      >
        <Text className="font-pregular">Home ?</Text>
      </Link>
    </View>
  );
};

export default Index;
