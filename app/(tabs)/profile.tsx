import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import postServices from "@/services/post/api";
import InfoBox from "@/components/InfoBox";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import LogOut from "@/components/LogOut";
import useAuth from "@/hooks/useAuth";
import useAppwrite from "@/hooks/useAppWrite";
import { Redirect } from "expo-router";
import ROUTES from "@/constants/routes";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={ROUTES.HOME} />;
  }

  const { data: posts } = useAppwrite(() =>
    postServices.getUserPosts(user.$id)
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <LogOut />
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={String(posts?.length || 0)}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
