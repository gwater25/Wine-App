import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useInventory } from '../context/WineInventoryContext';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const AddWineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { wine } = route.params || {}; // Get wine if passed

  const { addWine, updateWine } = useInventory();

  const [name, setName] = useState(wine?.name || '');
  const [type, setType] = useState(wine?.type || '');
  const [brand, setBrand] = useState(wine?.brand || '');
  const [price, setPrice] = useState(wine?.price?.toString() || '');
  const [stock, setStock] = useState(wine?.stock?.toString() || '');
  const [image, setImage] = useState(wine?.image || '');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Picked Image URI:', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !type || !brand || !price || !stock) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all fields',
        position: 'bottom',
      });
      return;
    }

    const wineData = {
      id: wine ? wine.id : Date.now(), // Keep existing ID if editing
      name,
      type,
      brand,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: image || 'https://via.placeholder.com/150',
    };

    if (wine) {
      updateWine(wine.id, wineData);
      Toast.show({
        type: 'success',
        text1: 'Wine Updated!',
        position: 'bottom',
      });
    } else {
      addWine(wineData);
      Toast.show({
        type: 'success',
        text1: 'Wine Added!',
        position: 'bottom',
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Wine Name" />

      <Text style={styles.label}>Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Wine Type" />

      <Text style={styles.label}>Brand</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Brand" />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" />

      <Text style={styles.label}>Stock</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} placeholder="Stock" keyboardType="numeric" />

      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.previewImage}
        />
      ) : null}

      <Button title={wine ? "Save Changes" : "Add Wine"} onPress={handleSave} color="crimson" />
    </View>
  );
};

export default AddWineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'cornsilk',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  uploadButton: {
    backgroundColor: 'crimson',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 15,
  },
});
