'use client';

import { fetchOneMovie } from '@/services/api';
import useFetch from '@/services/useFetch';
import { Genre, Movie } from '@/types/movieType';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie_id: Movie['id'] = Number(id);

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchOneMovie({ movie_id }));

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.originalTitle}>
            {movie.original_title && movie.original_title !== movie.title && (
              <Text>Оригінальна назва: {movie.original_title}</Text>
            )}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {formatReleaseDate(movie.release_date)}
            </Text>
            {movie.runtime && (
              <Text style={styles.metaText}>
                | {formatRuntime(movie.runtime)}
              </Text>
            )}
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>
              {formatVoteAverage(movie.vote_average)}
            </Text>
            <Text style={styles.votes}>({movie.vote_count} голосів)</Text>
          </View>
          {movie.genres && (
            <Text style={styles.genres}>{formatGenres(movie.genres)}</Text>
          )}
        </View>
      </View>

      {movie.tagline && <Text style={styles.tagline}>«{movie.tagline}»</Text>}

      <Text style={styles.overviewLabel}>Опис</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Деталі</Text>

        {movie.budget !== undefined && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Бюджет:</Text>
            <Text style={styles.detailValue}>
              {movie.budget > 0
                ? `${movie.budget.toLocaleString('uk-UA')} ₽`
                : 'Невідомо'}
            </Text>
          </View>
        )}

        {movie.revenue !== undefined && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Прибуток:</Text>
            <Text style={styles.detailValue}>
              {movie.revenue > 0
                ? `${movie.revenue.toLocaleString('uk-UA')} ₽`
                : 'Невідомо'}
            </Text>
          </View>
        )}

        {movie.status && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Статус:</Text>
            <Text style={styles.detailValue}>{movie.status}</Text>
          </View>
        )}

        {movie.production_companies &&
          movie.production_companies.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Студія:</Text>
              <Text style={styles.detailValue}>
                {movie.production_companies.map(comp => comp.name).join(', ')}
              </Text>
            </View>
          )}

        {movie.spoken_languages && movie.spoken_languages.length > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Мови:</Text>
            <Text style={styles.detailValue}>
              {movie.spoken_languages.map(lang => lang.name).join(', ')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonsSection}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={openIMDB}
          disabled={!movie.imdb_id}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {movie.imdb_id ? 'Перейти на IMDb' : 'IMDb недоступно'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={openHomepage}
          disabled={!movie.homepage}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            {movie.homepage ? 'Відкрити сайт' : 'Сайт недоступний'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  originalTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  votes: {
    fontSize: 14,
    color: '#888',
  },
  genres: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  overviewLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: '#888',
    paddingHorizontal: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  detailsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
    width: 100,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  buttonsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#e50914',
  },
  secondaryButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  primaryButtonText: {},
  secondaryButtonText: {
    color: '#888',
  },
});

export default MovieDetails;
