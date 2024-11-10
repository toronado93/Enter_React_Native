import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import Icons from "@/constants/icons";

interface IFormFiledProps {
  title: string;
  value?: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyboardType?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const FormField: React.FunctionComponent<IFormFiledProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  autoCapitalize,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          autoCapitalize={autoCapitalize}
          //   {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? Icons.Eye : Icons.EyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
