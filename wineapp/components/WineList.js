import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useWine } from '../context/WineContext';

const WineList = ({ wines, selectedType }) => {
  const { addToCellar, favorites, ratings, rateWine } = useWine();

  const filtered = selectedType
    ? wines.filter((wine) => wine.type === selectedType)
    : wines;

  const renderItem = ({ item }) => {
    const isSaved = favorites.some((w) => w.id === item.id);

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
        transition={{
          type: 'timing',
           duration: 400,
         }}
        style={styles.card}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
          key={star}
          onPress={() => rateWine(item.id, star)}
          style={{ marginRight: 4 }}
          >
          <FontAwesome
          name={ratings[item.id] >= star ? 'star' : 'star-o'}
          size={20}
          color="gold"
          />
          </TouchableOpacity>
        ))}
      </MotiView>
    );
  };

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: 'crimson',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WineList;
