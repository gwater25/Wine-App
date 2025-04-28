import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { useWine } from '../context/WineContext';

const WineList = ({ wines, selectedType }) => {
  const navigation = useNavigation();
  const { favorites, ratings } = useWine();

  const filtered = selectedType
    ? wines.filter((wine) => wine.type === selectedType)
    : wines;

  const renderItem = ({ item }) => {
    const isFavorited = favorites.includes(item.id); // ✅ changed to ID check

    return (
      <TouchableOpacity onPress={() => navigation.navigate('WineDetail', { wine: item })}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: 'timing', duration: 400 }}
          style={styles.card}
        >

          {isFavorited && (
            <View style={styles.favoriteBadge}>
              <FontAwesome name="heart" size={20} color="crimson" />
            </View>
          )}

          <Image
            source={{ uri: item?.image || 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg' }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.type} · {item.brand}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.stock}>Stock: {item.stock ?? 0} bottles</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name={(ratings[item.id] || 0) >= star ? 'star' : 'star-o'}
                  size={16}
                  color="gold"
                  style={styles.starIcon}
                />
              ))}
            </View>
          </View>
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
      extraData={favorites}
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
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#eee',
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