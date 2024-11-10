import { Text, View, ScrollView, Image } from "react-native";
import React from "react";
import Images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import ROUTES from "@/constants/routes";
import useAuth from "@/hooks/useAuth";
const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Redirect href={ROUTES.HOME} />;

  const handleRouteSignIn = () => {
    router.push(ROUTES.SIGNIN);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerClassName="h-full px-4 my-3">
        <View className="w-full items-center justify-center h-full">
          <Image
            className="w-[130px] h-[84px]"
            resizeMode="contain"
            source={Images.Logo}
          ></Image>
          <Image
            source={Images.Cards}
            className="max-w-[380px] w-full h-[250px]"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-3">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={Images.Path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora!
          </Text>
          <View className="w-full gap-4 mt-3">
            <CustomButton
              title="Continue with Email"
              handlePress={handleRouteSignIn}
              containerStyles="w-full min-h-[45px]"
            />
          </View>
        </View>
        <StatusBar backgroundColor="pink" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
