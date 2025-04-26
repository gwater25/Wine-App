import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WineInventoryContext = createContext();

export const WineInventoryProvider = ({ children }) => {
  const [wines, setWines] = useState([]);

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