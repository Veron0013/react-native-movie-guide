import { icons } from '@/constants/icons';
import { Movie } from '@/types/movieType';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const { id, title, poster_path, release_date, vote_average } = movie;

  return (
    <Link href={`/movie/${id}`} asChild className="flex-1 mb-6 mr-4">
      <Pressable className="flex w-full items-center bg-transparent active:scale-[0.97] active:opacity-60">
        <Image
          className="w-full mb-4 rounded-lg h-80"
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w342${poster_path}`
              : 'https://placehold.co/400x600?text=No+Image',
          }}
        />
        <Text className="text-sm text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4"></Image>
          <Text className="text-xs font-bold text-yellow-400 uppercase">
            {Math.round(vote_average)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="mt-1 text-xs text-gray-400">
            {release_date?.split('-')[0]}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default MovieCard;
