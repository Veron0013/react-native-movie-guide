import { images } from '@/constants/images';
import { Image, View } from 'react-native';
import '../globals.css';

export default function App() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
    
    </View>
  );
}
