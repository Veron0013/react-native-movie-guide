import { Movie } from '@/types/movieType';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const router = useRouter();
  const { id, title, poster_path, release_date, vote_average } = movie;

  return (
    <View className="mb-6 mr-4 flex-1">
      <TouchableOpacity
        className="flex w-full items-center bg-transparent"
        onPress={() => router.push(`/movie/${id}`)}
      >
        <Image
          className="mb-4 h-80 w-full rounded-lg"
          resizeMode="cover"
          source={{ uri: `https://image.tmdb.org/t/p/w342${poster_path}` }}
        />
        <Text className="text-sm text-white">{title}</Text>
        <Text className="text-xs text-gray-400">{release_date}</Text>
        <Text className="text-xs text-yellow-400">⭐ {vote_average}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieCard;
