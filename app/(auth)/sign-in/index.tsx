import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import FormField from "@/components/FormFiled";
import CustomButton from "@/components/CustomButton";
import Images from "@/constants/images";
import ROUTES from "@/constants/routes";
import { SingInSchema } from "./constant";
import loginService from "@/services/login/api";
import { CustomErrorExceptioner } from "@/utils/classes/CustomErrorException";
import userServices from "@/services/user/api";
import useAuth from "@/hooks/useAuth";
import { EDecision } from "@/providers/useAuthProvider";
const SignIn = () => {
  const {
    login,
    sessionInfo: { sessionHandler },
  } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "e.ertac.p@gmail.com",
    password: "123456789",
  });

  const handleSubmit = async () => {
    const zodResult = SingInSchema.safeParse({
      email: form.email,
      password: form.password,
    });
    // if schema is okey
    if (zodResult.success) {
      setSubmitting(true);
      try {
        // create a season
        const sessionResult = await loginService.SignIn({
          email: form.email,
          password: form.password,
        });

        if (sessionResult) {
          sessionHandler({
            sessionId: sessionResult.$id,
            decision: EDecision.SESSION_CREATE,
          });
        }

        const getUserResult = await userServices.getCurrentUser();

        console.log("current user information>>>>", getUserResult);
        const { username, email, $id, avatar } = getUserResult;
        login(username, email, $id, avatar);

        router.replace(ROUTES.HOME);
      } catch (error: any) {
        const errorResult = new CustomErrorExceptioner(error);
        Alert.alert(String(errorResult.errorCode), errorResult.handleError());
      } finally {
        setSubmitting(false);
      }
    } else {
      Alert.alert("Error Occured", zodResult.error.issues[0].message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={Images.Logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={ROUTES.SIGNUP}
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
