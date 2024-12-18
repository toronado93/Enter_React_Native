import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import EmptyState from "@/components/EmptyState";
import Images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import postServices from "@/services/post/api";
import useAppwrite from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";
import Trending from "@/components/Trending";
// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
// import { Trending, VideoCard } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(postServices.getAllPosts);
  const { data: latestPosts, refetch: refectLatestPost } = useAppwrite(
    postServices.getLatestPosts
  );
  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-4"
        data={posts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            refreshing={refreshing}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={Images.LogoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
