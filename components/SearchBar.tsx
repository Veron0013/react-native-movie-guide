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
    <View className="flex-row items-center px-5 py-4 rounded-full bg-dark-100">
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
        className="flex-1 ml-2 text-white"
      ></TextInput>
    </View >
  );
};

export default SearchBar;
