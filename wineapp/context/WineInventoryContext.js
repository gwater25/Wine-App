import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WineInventoryContext = createContext();

export const WineInventoryProvider = ({ children }) => {
  const [wines, setWines] = useState([
    {
      id: 1,
      name: 'Cabernet Sauvignon',
      type: 'Red',
      brand: 'Brand A',
      price: 20,
      stock: 10,
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg',
    },
    {
      id: 2,
      name: 'Chardonnay',
      type: 'White',
      brand: 'Brand B',
      price: 25,
      stock: 5,
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg',
    },
  ]);


  // Load wines from storage
  useEffect(() => {
    const loadWines = async () => {
      try {
        const storedWines = await AsyncStorage.getItem('wines');
        if (storedWines) {
          setWines(JSON.parse(storedWines));
        }
      } catch (error) {
        console.error('Failed to load wines', error);
      }
    };

    loadWines();
  }, []);

  // Save wines to storage when they change
  useEffect(() => {
    const saveWines = async () => {
      try {
        await AsyncStorage.setItem('wines', JSON.stringify(wines));
      } catch (error) {
        console.error('Failed to save wines', error);
      }
    };

    if (wines.length > 0) {
      saveWines();
    }
  }, [wines]);

  const addWine = (wine) => setWines((prev) => [...prev, wine]);

  const updateWine = (id, updates) => {
    setWines((prev) =>
      prev.map((wine) => (wine.id === id ? { ...wine, ...updates } : wine))
    );
  };

  const deleteWine = (id) => {
    setWines((prev) => prev.filter((wine) => wine.id !== id));
  };

  return (
    <WineInventoryContext.Provider value={{ wines, addWine, updateWine, deleteWine }}>
      {children}
    </WineInventoryContext.Provider>
  );
};

export const useInventory = () => useContext(WineInventoryContext);