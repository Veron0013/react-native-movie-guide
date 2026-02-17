import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import './globals.css';

const NAV_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#030014',
    card: '#030014',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={NAV_THEME}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#030014' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
            gestureEnabled: true,
            presentation: 'modal',
            animation: 'slide_from_left',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
