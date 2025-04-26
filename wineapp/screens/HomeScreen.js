import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WineList from '../components/WineList';
import { Ionicons } from '@expo/vector-icons';
import { useInventory } from '../context/WineInventoryContext';

const HomeScreen = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { wines } = useInventory();

  const handleTypePress = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const filteredWines = wines.filter((wine) => {
    const matchesType = selectedType ? wine.type === selectedType : true;
    const matchesSearch = [wine.name, wine.type, wine.brand].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesType && matchesSearch;
  });

  return (
    <View style={styles.homeContainer}>
      <View style={styles.tabContainer}>
        {['All Wine', 'Red', 'White', 'Sparkling', 'Rose'].map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.tab,
              selectedType === (label === 'All Wine' ? null : label) && styles.selectedTab,
            ]}
            onPress={() => handleTypePress(label === 'All Wine' ? null : label)}
          >
            <Text style={styles.tabText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search wines by name, type, or brand..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <WineList wines={filteredWines} selectedType={selectedType} />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddWine')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    marginTop: 35,
    backgroundColor: 'crimson',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'cornsilk',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectedTab: {
    backgroundColor: 'crimson',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'crimson',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default HomeScreen;