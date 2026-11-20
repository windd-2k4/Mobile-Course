import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import CatalogScreen from './components/CatalogScreen';
import DetailScreen from './components/DetailScreen';
import { Sneaker } from './data/sneakers';

export type Route =
  | { name: 'welcome' }
  | { name: 'catalog' }
  | { name: 'detail'; sneaker: Sneaker };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'welcome' });

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={route.name === 'welcome' ? 'light-content' : 'dark-content'} />
      {route.name === 'welcome' && (
        <WelcomeScreen onStart={() => setRoute({ name: 'catalog' })} />
      )}
      {route.name === 'catalog' && (
        <CatalogScreen onSelect={(sneaker) => setRoute({ name: 'detail', sneaker })} />
      )}
      {route.name === 'detail' && (
        <DetailScreen sneaker={route.sneaker} onBack={() => setRoute({ name: 'catalog' })} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000000' },
});
