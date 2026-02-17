import { Movie } from '@/types/movieType';

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_TMDB_TOKEN,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`,
  },
};

interface fetchMoviesProps {
  query: string;
}

export const fetchMovies = async ({ query }: fetchMoviesProps) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error('Failed  to fetch movies', response.statusText);
  }

  const data = await response.json();

  return data.results;
};

interface fetchOneMovieProp {
  movie_id: Movie['id'];
}

export const fetchOneMovie = async ({ movie_id }: fetchOneMovieProp) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error('Failed  to fetch movies', response.statusText);
  }

  const data = await response.json();

  return data;
};
