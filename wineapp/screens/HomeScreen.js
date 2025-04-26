import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WineList from '../components/WineList';
import { useInventory } from '../context/WineInventoryContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation();
  const { wines } = useInventory();

  const handleTypePress = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

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

      <WineList wines={wines} selectedType={selectedType} />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Wine')}
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