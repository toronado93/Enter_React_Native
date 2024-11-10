import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import Images from "@/constants/images";
import { SingUpSchema } from "./constant";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFiled";
import registerServices from "@/services/register/api";
import loginService from "@/services/login/api";
import userServices from "@/services/user/api";
import { CustomErrorExceptioner } from "@/utils/classes/CustomErrorException";
import useAuth from "@/hooks/useAuth";
import ROUTES from "@/constants/routes";
import { EDecision } from "@/providers/useAuthProvider";

const SignUp = () => {
  const {
    login,
    sessionInfo: { sessionHandler },
  } = useAuth();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "toronado93",
    email: "eep0@outlook.com",
    password: "123456789",
  });

  const handleSubmit = async () => {
    const zodResult = SingUpSchema.safeParse({
      email: form.email,
      password: form.password,
      username: form.username,
    });
    // if schema is okey
    if (zodResult.success) {
      setSubmitting(true);
      try {
        const createUserResult = await registerServices.createUser({
          email: form.email,
          password: form.password,
          username: form.username,
        });
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

        // insert unser into the db

        const insertResult = await userServices.inserUserinToDB(
          createUserResult
        );

        if (insertResult.$id) {
          const { username, email, $id, avatar } = insertResult;
          login(username, email, $id, avatar);
          router.replace(ROUTES.HOME);
        }
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
          className="w-full flex justify-center h-full px-4 my-6"
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
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            autoCapitalize="none"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
