import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useInventory } from '../context/WineInventoryContext';
import { useNavigation } from '@react-navigation/native';


export default function InventoryReportScreen() {
  const { wines } = useInventory();
  const navigation = useNavigation();

  const totalWines = wines.length;
  const totalBottles = wines.reduce((sum, wine) => sum + (wine.stock ?? 0), 0);
  const totalValue = wines.reduce((sum, wine) => sum + ((wine.price ?? 0) * (wine.stock ?? 0)), 0);

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inventory Report</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total Wines:</Text>
        <Text style={styles.value}>{totalWines} wines</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Bottles:</Text>
        <Text style={styles.value}>{totalBottles} bottles</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Inventory Value:</Text>
        <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'crimson',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'cornsilk',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  
  backButtonText: {
    color: 'crimson',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});