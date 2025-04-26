import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWine } from '../context/WineContext';
import { useInventory } from '../context/WineInventoryContext';
import WineList from '../components/WineList';

export default function CellarScreen() {
  const { favorites } = useWine();
  const { wines } = useInventory();

  // Map favorite IDs to full wine objects
  const favoriteWines = wines.filter((wine) => favorites.includes(wine.id));

  return (
    <View style={styles.cellarContainer}>
      {favoriteWines.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cellar is empty. Add some wines!</Text>
        </View>
      ) : (
        <WineList wines={favoriteWines} selectedType={null} />
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