import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { ReactNode } from "react";
interface ICustomButtonProps {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const CustomButton: React.FunctionComponent<ICustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={clsx(
        `bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center`,
        containerStyles,
        `${isLoading ? "opacity-50" : ""}`
      )}
      disabled={isLoading}
    >
      {children ? (
        children
      ) : (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
