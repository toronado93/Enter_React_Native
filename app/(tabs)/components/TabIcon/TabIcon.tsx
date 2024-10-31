import {
  ColorValue,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

interface ITabIcon {
  icon: ImageSourcePropType;
  color: ColorValue;
  name: string;
  focused: boolean;
}

const TabIcon: React.FunctionComponent<ITabIcon> = ({
  icon,
  color,
  name,
  focused,
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text className={`${focused ? "text-white" : ""} text-xs font-pregular`}>
        {name}
      </Text>
    </View>
  );
};

export { TabIcon };
