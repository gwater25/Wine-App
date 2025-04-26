import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWine } from '../context/WineContext';
import WineList from '../components/WineList';

export default function CellarScreen() {
  const { favorites } = useWine();

  return (
    <View style={styles.cellarContainer}>
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cellar is empty. Add some wines!</Text>
        </View>
      ) : (
        <WineList wines={favorites} selectedType={null} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cellarContainer: {
    marginTop: 35,
    backgroundColor: 'crimson',
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});