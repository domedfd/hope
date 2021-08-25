import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import {useFonts} from 'expo-font'
import Index from './src/Index'

export default function App() {
  const [loaded] = useFonts({
    SuperMario256: require('./assets/fonts/SuperMario256.ttf'),
  });
  
  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  return (

      <Index />

  );
}


