'use client';

import ActionButton from '@/components/card/ActionButton';
import DetailsRow from '@/components/card/DetailsRow';
import { fetchOneMovie } from '@/services/api';
import useFetch from '@/services/useFetch';
import { Genre, Movie } from '@/types/movieType';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie_id: Movie['id'] = Number(id);

  const insets = useSafeAreaInsets();

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchOneMovie({ movie_id }));

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const formatRuntime = (runtime?: number) => {
    if (!runtime) return 'Тривалість невідома';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours} год ${minutes} хв`;
  };

  const formatGenres = (genres?: Genre[]) => {
    if (!genres) return 'Жанр невідомий';
    return genres.map(genre => genre.name).join(', ');
  };

  const formatVoteAverage = (vote: number) => {
    return `${vote}/10`;
  };

  const openIMDB = () => {
    if (movie && movie.imdb_id) {
      Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}/`);
    }
  };

  const openHomepage = () => {
    if (movie && movie.homepage) {
      Linking.openURL(movie.homepage);
    }
  };

  if (!movie)
    return (
      <View>
        <Text>No data {movie_id}</Text>
      </View>
    );

  return (
    <ScrollView
      className="flex-1 bg-secondary "
      contentContainerStyle={{
        paddingTop: 40,
        paddingBottom: insets.bottom + 32,
      }}
    >
      <View className="mx-4 flex-row rounded-xl bg-ratingBox">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="aspect-[3/4] w-[45%] rounded-md md:w-40"
        />
        <View className="ml-4 flex-1 justify-between">
          <Text className="my-1 text-xl font-bold text-secondaryText">
            {movie.title}
          </Text>

          {movie.original_title && movie.original_title !== movie.title && (
            <Text className="mb-2 text-base text-accentText">
              Оригінальна назва: {movie.original_title}
            </Text>
          )}

          <View className="flex-row items-center">
            <Text className="mb-2 text-sm text-accentText">
              {formatReleaseDate(movie.release_date)}
            </Text>
            {movie.runtime && (
              <Text className="mb-2 text-sm text-accentText">
                | {formatRuntime(movie.runtime)}
              </Text>
            )}
          </View>
          <View className="mb-2 flex-row items-center">
            <Text className="mr-2 text-xl font-bold text-white">
              {formatVoteAverage(movie.vote_average)}
            </Text>
            <Text className="text-sm text-accentText">
              ({movie.vote_count} голосів)
            </Text>
          </View>

          {movie.genres && (
            <Text className="mb-2 text-base text-white">
              {formatGenres(movie.genres)}
            </Text>
          )}
        </View>
      </View>

      {movie.tagline && (
        <Text className="mb-4 px-4 text-center text-lg italic text-white">
          «{movie.tagline}»
        </Text>
      )}

      <Text className="mb-2 px-4 text-xl font-bold text-white">Опис</Text>
      <Text className="mb-6 px-4 text-base leading-6 text-accentText">
        {movie.overview}
      </Text>

      <View className="mb-6 px-4">
        <Text className="mb-4 text-xl font-bold text-white">Деталі</Text>

        {movie.budget !== undefined && (
          <DetailsRow
            label="Бюджет:"
            value={
              movie.budget > 0
                ? `${movie.budget.toLocaleString('uk-UA')} $`
                : 'Невідомо'
            }
          />
        )}

        {movie.revenue !== undefined && (
          <DetailsRow
            label="Прибуток:"
            value={
              movie.revenue > 0
                ? `${movie.revenue.toLocaleString('uk-UA')} $`
                : 'Невідомо'
            }
          />
        )}

        {movie.status && <DetailsRow label="Статус:" value={movie.status} />}

        {!!movie.production_companies?.length && (
          <DetailsRow
            label="Студія:"
            value={movie.production_companies
              .map((c: { name: string }) => c.name)
              .join(', ')}
          />
        )}

        {!!movie.spoken_languages?.length && (
          <DetailsRow
            label="Мови:"
            value={movie.spoken_languages
              .map((l: { name: string }) => l.name)
              .join(', ')}
          />
        )}
      </View>

      <View className="mb-6 flex-row px-4">
        <ActionButton
          title="Перейти на IMDb"
          disabledTitle="IMDb недоступно"
          onPress={openIMDB}
          enabled={!!movie.imdb_id}
          variant="secondary"
        />

        <View className="w-4" />

        <ActionButton
          title="Відкрити сайт"
          disabledTitle="Сайт недоступний"
          onPress={openHomepage}
          enabled={!!movie.homepage}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
