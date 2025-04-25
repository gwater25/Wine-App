import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWine } from '../context/WineContext';
import { FontAwesome } from '@expo/vector-icons';

export default function WineDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { wine } = route.params;

  const { addToCellar, removeFromCellar, favorites, ratings, rateWine } = useWine();

  const isSaved = favorites.some((w) => w.id === wine.id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: wine.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{wine.name}</Text>
        <Text style={styles.meta}>{wine.type} · {wine.brand}</Text>
        <Text style={styles.price}>${wine.price}</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => rateWine(wine.id, star)}>
              <FontAwesome
                name={(ratings[wine.id] || 0) >= star ? 'star' : 'star-o'}
                size={28}
                color="gold"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isSaved && styles.removeButton]}
          onPress={() =>
            isSaved ? removeFromCellar(wine.id) : addToCellar(wine)
          }
        >
          <Text style={styles.buttonText}>
            {isSaved ? 'Remove from Cellar' : 'Add to Cellar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: { width: '100%', height: 300 },
  content: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold' },
  meta: { fontSize: 16, color: '#666', marginVertical: 4 },
  price: { fontSize: 20, color: 'crimson', marginVertical: 10 },
  stars: { flexDirection: 'row', marginVertical: 10 },
  star: { marginRight: 6 },
  button: {
    backgroundColor: 'crimson',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  removeButton: { backgroundColor: 'gray' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  back: { marginTop: 30 },
  backText: { fontSize: 16, color: '#888' },
});
