import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import '../globals.css';

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full min-w-full" />
      {/*<ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>

        <Image
          source={icons.logo}

          className="w-12 h-10 mx-auto mt-20 mb-5" />

        {moviesLoading
          ? (
            <ActivityIndicator
              size='large'
              color={colors.accentText}
              className='self-center mt-50' />
          )
          : moviesError
            ? (
              <Text>Error : {moviesError?.message}</Text>
            )
            : (
              < View className="flex-1 mt-5">
                <SearchBar
                  onPress={() => router.push('/search')}
                  placeholder={'Search or a movie'} />
                <>
                  <Text className='mt-5 mb-3 text-xl font-bold text-white'>Latest movies</Text>

                  <FlatList
                    className='flex pb-32 mt-2'
                    data={movies}
                    renderItem={({ item }) => (<MovieCard movie={item} />)}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: 'flex-start',
                      gap: 20,
                      paddingRight: 5,
                      marginBottom: 10
                    }}
                    scrollEnabled={false}
                  />

                </>
              </View>
            )
        }
      </ScrollView >*/}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="mx-auto mb-5 mt-20 h-10 w-12"
            />

            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search or a movie"
            />

            <Text className="mb-3 mt-5 self-center text-xl font-bold text-white">
              Latest movies
            </Text>
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 120,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
      />
    </View>
  );
}
