import { useState } from "react";
import { Redirect, router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import type { DocumentPickerAsset } from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CreateSchema } from "./constant";
import Icons from "@/constants/icons";
// import { createVideoPost } from "../../lib/appwrite";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFiled";
import useAuth from "@/hooks/useAuth";
import postServices from "@/services/post/api";
import ROUTES from "@/constants/routes";
import { CustomErrorExceptioner } from "@/utils/classes/CustomErrorException";

export interface IDocumentPickerProps {
  title: string;
  video: DocumentPickerAsset | undefined;
  thumbnail: DocumentPickerAsset | undefined;
  prompt: string;
}

export interface IDocumentPickerPropsWithUserId extends IDocumentPickerProps {
  userId: string;
}

export type TDocumentType = "image" | "video";

const Create = () => {
  const { user } = useAuth();
  if (!user) return <Redirect href={ROUTES.LOGIN} />;
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<IDocumentPickerProps>({
    title: "",
    video: undefined,
    thumbnail: undefined,
    prompt: "",
  });

  const openPicker = async (selectType: TDocumentType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    // Alert.alert("Document picked", JSON.stringify(result, null, 2));

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
      // } else {
      //   setTimeout(() => {
      //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
      //   }, 100);
    }
  };

  const submit = async () => {
    //
    const zodResult = CreateSchema.safeParse({
      title: form.title,
      video: form.video,
      thumbnail: form.thumbnail,
      prompt: form.prompt,
    });

    setUploading(true);

    if (zodResult.success) {
      try {
        const createVideoResult = await postServices.createVideoPost({
          ...form,
          userId: user.$id,
        });
        if (!createVideoResult) throw new Error("File couldnt uploaded!");
        Alert.alert("Success", "File succesfully uploaded");
        router.push(ROUTES.HOME);
      } catch (error) {
        const errorResult = new CustomErrorExceptioner(error);
        Alert.alert(String(errorResult.errorCode), errorResult.handleError());
      } finally {
        setForm({
          title: "",
          video: undefined,
          thumbnail: undefined,
          prompt: "",
        });

        setUploading(false);
      }
    } else {
      Alert.alert("Zod Error Occured", zodResult.error.issues[0].message);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={Icons.Upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={Icons.Upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
