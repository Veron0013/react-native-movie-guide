import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: searchAgain,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const asyncFetch = async () => {
      if (searchQuery.trim().length > 2) {
        await searchAgain();
      } else {
        reset();
      }
    };

    asyncFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={item => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center w-full mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search smth"
                value={searchQuery}
                OnChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size={'large'}
                color={colors.primary}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500">
                ERROR : {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl font-bold text-white">
                  Search result for{' '}
                  <Text className="text-darkAccent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      ></FlatList>
    </View>
  );
};

export default Search;
