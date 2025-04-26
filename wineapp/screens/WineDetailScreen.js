import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWine } from '../context/WineContext';
import { useInventory } from '../context/WineInventoryContext';
import { FontAwesome } from '@expo/vector-icons';

export default function WineDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { wine } = route.params;

  const { ratings, rateWine } = useWine();
  const { deleteWine } = useInventory();

  const confirmDelete = () => {
    Alert.alert('Delete Wine', 'Are you sure you want to delete this wine?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteWine(wine.id);
          navigation.navigate('Main');
        },
      },
    ]);
  };

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
          style={styles.button}
          onPress={() => navigation.navigate('AddWine', { wine })}
        >
          <Text style={styles.buttonText}>Edit Wine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={confirmDelete}
        >
          <Text style={styles.buttonText}>Delete Wine</Text>
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
  deleteButton: {
    backgroundColor: 'gray',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  back: { marginTop: 30 },
  backText: { fontSize: 16, color: '#888' },
});
