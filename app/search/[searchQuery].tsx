import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import postServices from "@/services/post/api";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/hooks/useAppWrite";

const narrowDownTheType = (argument: string | string[]): string => {
  return typeof argument === "string" ? argument : argument[0];
};

const Search = () => {
  const { searchQuery } = useLocalSearchParams();
  const stringifyQuery = narrowDownTheType(searchQuery);

  const { data: posts, refetch } = useAppwrite(() =>
    postServices.searchPosts(stringifyQuery)
  );

  useEffect(() => {
    refetch();
  }, [stringifyQuery]);

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
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {stringifyQuery}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={stringifyQuery} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
