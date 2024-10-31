import React from "react";
import { Tabs } from "expo-router";
import { tabInfo } from "./contant";
import { TabIcon } from "./components/TabIcon";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#bcc2cd",
        tabBarStyle: {
          backgroundColor: "#4577d5",
          borderTopWidth: 1,

          height: 60,
        },
      }}
    >
      {tabInfo.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={tab.icon}
                color={color}
                name={tab.name}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
