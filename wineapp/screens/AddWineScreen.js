import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useInventory } from '../context/WineInventoryContext';

export default function AddWineScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addWine, updateWine } = useInventory();

  const editing = route.params?.wine;

  const [form, setForm] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        type: editing.type,
        brand: editing.brand,
        price: editing.price.toString(),
        stock: editing.stock !== undefined ? editing.stock.toString() : '0',
      });
    }
  }, [editing]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const { name, type, brand, price } = form;

    if (!name || !type || !brand || !price || !stock) {
      Alert.alert('Validation', 'Please fill out all fields');
      return;
    }

    if (editing) {
      updateWine(editing.id, {
        ...editing,
        ...form,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });
    } else {
      const newWine = {
        id: Date.now(),
        name,
        type,
        brand,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      image: `https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg`
    };
    addWine(newWine);
  }

  navigation.goBack();
};

return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>{editing ? 'Update Wine' : 'Add New Wine'}</Text>

    <TextInput
      style={styles.input}
      placeholder="Wine Name"
      value={form.name}
      onChangeText={(text) => handleChange('name', text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Type (Red, White, etc.)"
      value={form.type}
      onChangeText={(text) => handleChange('type', text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Brand"
      value={form.brand}
      onChangeText={(text) => handleChange('brand', text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Price"
      keyboardType="numeric"
      value={form.price}
      onChangeText={(text) => handleChange('price', text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Stock (number of bottles)"
      keyboardType="numeric"
      value={form.stock}
      onChangeText={(text) => handleChange('stock', text)}
    />

    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>{editing ? 'Update Wine' : 'Save Wine'}</Text>
    </TouchableOpacity>
  </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  backgroundColor: 'white',
  flexGrow: 1,
},
title: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 15,
},
button: {
  backgroundColor: 'crimson',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
});