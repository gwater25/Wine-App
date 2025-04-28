import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favData = await AsyncStorage.getItem('favorites');
        if (favData) {
          setFavorites(JSON.parse(favData));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCellar = (wine) => {
    if (!favorites.includes(wine.id)) {
      setFavorites((prev) => [...prev, wine.id]);
      Toast.show({
        type: 'success',
        text1: 'Added to Cellar!',
        text2: `${wine.name} has been added.`,
        position: 'bottom',
      });
    }
  };

  const removeFromCellar = (wineId) => {
    setFavorites((prev) => prev.filter((id) => id !== wineId));
    Toast.show({
      type: 'info',
      text1: 'Removed from Cellar',
      position: 'bottom',
    });
  };

  const rateWine = (wineId, rating) => {
    setRatings((prev) => ({ ...prev, [wineId]: rating }));
  };

  return (
    <WineContext.Provider value={{ favorites, addToCellar, removeFromCellar, ratings, rateWine }}>
      {children}
    </WineContext.Provider>
  );
};

export const useWine = () => useContext(WineContext);
