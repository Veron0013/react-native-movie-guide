import { Movie } from '@/types/movieType'
import React from 'react'
import { Image, Text, View } from 'react-native'

interface Props {
	movie: Movie
}

function MovieCard({ movie }: Props) {
	const { id, title, poster_path, release_date, vote_average } = movie

	return (
		<View className="flex flex-1 items-center mr-4 mb-6">
			<Image
				className='mb-4 w-full h-80 rounded-lg'
				resizeMode='cover'
				source={{ uri: `https://image.tmdb.org/t/p/w342${poster_path}` }}
			/>
			<Text className="text-sm text-white">{title}</Text>
			<Text className="text-xs text-gray-400">{release_date}</Text>
			<Text className="text-xs text-yellow-400">⭐ {vote_average}</Text>
		</View>
	)
}

export default MovieCard