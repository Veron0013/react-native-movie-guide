import React from 'react';
import { Text, View } from 'react-native';

interface RowProps {
  label: string;
  value: React.ReactNode;
}

const DetailsRow = ({ label, value }: RowProps) => {
  return (
    <View className="mb-3 flex-row">
      <Text className="w-[100px] text-base font-semibold text-accentText">
        {label}
      </Text>
      <Text className="flex-1 text-base text-white">{value}</Text>
    </View>
  );
};

export default DetailsRow;
