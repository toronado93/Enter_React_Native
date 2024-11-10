import React from "react";
import { View, Text } from "react-native";

interface IInfoBox {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox: React.FunctionComponent<IInfoBox> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
