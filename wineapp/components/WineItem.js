import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WineItem = ({ wine }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: wine.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.text}>{wine.name}</Text>
        <Text style={styles.text}>{wine.brand}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: 'cornsilk',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 200,
    width: 350,
  },
  image: {
    width: 330,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 2,
  },
});

export default WineItem;
