import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="bg-dark-100 flex-row items-center rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={colors.darkAccent}
      />
      <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        placeholderTextColor={colors.accentText}
        value=""
        className="ml-2 flex-1 text-white"
      ></TextInput>
    </View>
  );
};

export default SearchBar;
