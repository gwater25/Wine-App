import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';

const WineList = ({ wines, selectedType }) => {
  const navigation = useNavigation();

  const filtered = selectedType
    ? wines.filter((wine) => wine.type === selectedType)
    : wines;

  const renderItem = ({ item }) => {
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
            <Text style={styles.stock}>stock: {item.stock ?? 0} bottles</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
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
  price: {
    fontSize: 16,
    color: 'crimson',
    marginTop: 6,
  },
  stock: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
});

export default WineList;