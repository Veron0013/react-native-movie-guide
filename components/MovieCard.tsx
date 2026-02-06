import { Movie } from '@/types/movieType';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text } from 'react-native';

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const { id, title, poster_path, release_date, vote_average } = movie;

  return (
    <Link href={`/movie/${id}`} asChild className="mb-6 mr-4 flex-1">
      <Pressable className="flex w-full items-center bg-transparent active:scale-[0.97] active:opacity-60">
        <Image
          className="mb-4 h-80 w-full rounded-lg"
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w342${poster_path}`
              : 'https://placehold.co/400x600?text=No+Image',
          }}
        />
        <Text className="text-sm text-white">{title}</Text>
        <Text className="text-xs text-gray-400">{release_date}</Text>
        <Text className="text-xs text-yellow-400">⭐ {vote_average}</Text>
      </Pressable>
    </Link>
  );
}

export default MovieCard;
