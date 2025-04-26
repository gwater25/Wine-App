import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WineContext = createContext();

const migrateFavorites = (oldFavorites) => {
  return oldFavorites.map((wine) => ({
    ...wine,
    stock: wine.stock !== undefined ? wine.stock : 0,
  }));
};

export const WineProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  // Load favorites from AsyncStorage if needed
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(migrateFavorites(JSON.parse(storedFavorites)));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };

    loadFavorites();
  }, []);

  const addToCellar = (wine) => {
    setFavorites((prev) => {
      const updated = [...prev, { ...wine, stock: wine.stock !== undefined ? wine.stock : 0 }];
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
      const updated = prev.filter((wine) => wine.id !== wineId);
      AsyncStorage.setItem('favorites', JSON.stringify(updated));
      const removedWine = prev.find((wine) => wine.id === wineId);
      Toast.show({
        type: 'info',
        text1: 'Removed from Cellar',
        text2: removedWine ? `${removedWine.name} has been removed.` : '',
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