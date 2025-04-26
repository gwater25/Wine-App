import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // favorites are now wine IDs
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };

    loadFavorites();
  }, []);

  const addToCellar = (wine) => {
    setFavorites((prev) => {
      const updated = [...prev, wine.id];
      AsyncStorage.setItem('favorites', JSON.stringify(updated));
      Toast.show({
        type: 'success',
        text1: 'Added to Cellar!',
        text2: `${wine.name} has been added.`,
        position: 'bottom',
      });
      return updated;
    });
  };

  const removeFromCellar = (wineId) => {
    setFavorites((prev) => {
      const updated = prev.filter((id) => id !== wineId);
      AsyncStorage.setItem('favorites', JSON.stringify(updated));
      Toast.show({
        type: 'info',
        text1: 'Removed from Cellar',
        position: 'bottom',
      });
      return updated;
    });
  };

  const rateWine = (wineId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [wineId]: rating,
    }));
  };

  return (
    <WineContext.Provider value={{ favorites, addToCellar, removeFromCellar, ratings, rateWine }}>
      {children}
    </WineContext.Provider>
  );
};

export const useWine = () => useContext(WineContext);
