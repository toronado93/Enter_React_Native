import React, { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import Icons from "@/constants/icons";
import ROUTES from "@/constants/routes";

interface ISearchInputProps {
  initialQuery?: string;
  refetch?: () => void;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
  initialQuery,
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          // if you are already inside of search route , just update the query
          if (pathname.startsWith(ROUTES.SEARCH))
            router.setParams({ searchQuery: query });
          // go to search route with query
          else router.push(`${ROUTES.SEARCH}/${query}`);
        }}
      >
        <Image source={Icons.Search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
