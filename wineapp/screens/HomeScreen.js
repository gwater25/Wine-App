import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import WineList from '../components/WineList';
import wines from '../data/Wines';

const HomeScreen = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypePress = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {['All Wine', 'Red', 'White', 'Sparkling', 'Rose'].map((type, index) => {
          const wineType = type === 'All Wine' ? null : type;
          const isSelected = selectedType === wineType;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.tab, isSelected && styles.selectedTab]}
              onPress={() => handleTypePress(wineType)}
            >
              <Text style={[styles.tabText, isSelected && styles.selectedText]}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <WineList wines={wines} selectedType={selectedType} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'cornsilk',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    margin: 4,
  },
  selectedTab: {
    backgroundColor: 'crimson',
  },
  tabText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
});

export default HomeScreen;
