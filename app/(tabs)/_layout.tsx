import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';

interface tabIconProps {
  focused: boolean;
  text: string;
  icon: ImageSourcePropType;
}

const TabIcon = ({ focused, text, icon }: tabIconProps) => {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
    >
      <Image source={icon} tintColor={colors.secondary} className="size-6" />
      <Text className="ml-2 text-base font-semibold text-secondary">
        {text}
      </Text>
    </ImageBackground>
  ) : (
    <View className="size-full items-center justify-center rounded-full">
      <Image source={icon} tintColor={colors.accentText} className="size-6" />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: '#030014' },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: colors.searchBar,
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 50,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.searchBar,
          maxHeight: 54,
          paddingVertical: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Save',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text="Saved" icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
