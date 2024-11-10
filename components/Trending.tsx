import React, { useState, useCallback } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

import Icons from "@/constants/icons";
import { PostModel } from "@/services/post/model";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: PostModel.IPost;
  item: PostModel.IPost;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      //@ts-ignore
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: String(item.video),
          }}
          style={{ width: 208, height: 288, borderRadius: 33, marginTop: 3 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            //@ts-ignore
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={Icons.Play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: PostModel.IPost[] }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems.length > 0 && viewableItems[0].key !== activeItem.$id) {
        setActiveItem(
          posts.find((post) => post.$id === viewableItems[0]?.key)!
        );
      }
    },
    [activeItem, posts]
  );
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: moderateScale(110, 0.2), y: 0 }}
    />
  );
};

export default Trending;
