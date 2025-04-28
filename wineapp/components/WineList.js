import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useWine } from '../context/WineContext';


const WineList = ({ wines, selectedType }) => {
  const navigation = useNavigation();
  const { favorites, ratings } = useWine();

  const filtered = selectedType
    ? wines.filter((wine) => wine.type === selectedType)
    : wines;

  const renderItem = ({ item }) => {
    const isFavorited = favorites.some((w) => w.id === item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('WineDetail', { wine: item })}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: 'timing', duration: 400 }}
          style={styles.card}
        >

          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>{item.type} · {item.brand}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.stock}>Stock: {item.stock ?? 0} bottles</Text>
          
            <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
              key={star}
              name={(ratings[item.id] || 0 ) >= star ? 'star' : 'star-o'}
              size={22}
              color="gold"
              style={styles.starIcon}
              />
              ))}
            </View>
          </View>

          {isFavorited && (
            <View stylele={styles.favoritebadge}>
              <FontAwesome name='heart' size={20} color='crimson' />
            </View>
          )}

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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    top: 20,
    backgroundColor: '#eee',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  meta: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: 'crimson',
    marginTop: 8,
  },
  stock: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  starIcon: {
    marginRight: 2,
  },
});

export default WineList;