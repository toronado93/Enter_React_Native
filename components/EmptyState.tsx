import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";
import React from "react";
import Images from "@/constants/images";
import ROUTES from "@/constants/routes";

interface IEmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={Images.Empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push(ROUTES.HOME)}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
