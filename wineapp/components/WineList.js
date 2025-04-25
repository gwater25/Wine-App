// WineList.js
import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useWine } from '../context/WineContext';
import { useNavigation } from '@react-navigation/native';

const WineList = ({ wines, selectedType }) => {
  const { addToCellar, favorites, ratings, rateWine } = useWine();
  const navigation = useNavigation();

  const filtered = selectedType
    ? wines.filter((wine) => wine.type === selectedType)
    : wines;

  const renderItem = ({ item }) => {
    const isSaved = favorites.some((w) => w.id === item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('WineDetail', { wine: item })}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: 'timing', duration: 400 }}
          style={styles.card}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>{item.type} · {item.brand}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => rateWine(item.id, star)}
                >
                  <FontAwesome
                    name={(ratings[item.id] || 0) >= star ? 'star' : 'star-o'}
                    size={20}
                    color="gold"
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => addToCellar(item)}
            disabled={isSaved}
            style={[styles.button, isSaved && styles.buttonDisabled]}
          >
            <FontAwesome
              name={isSaved ? 'heart' : 'heart-o'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </MotiView>
      </TouchableOpacity>
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
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: 'crimson',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    marginRight: 4,
  },
  button: {
    backgroundColor: 'crimson',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
});

export default WineList;