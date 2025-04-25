import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  const addToCellar = (wine) => {
    if (!favorites.find((w) => w.id === wine.id)) {
      setFavorites([...favorites, wine]);
  
      Toast.show({
        type: 'success',
        text1: 'Added to Cellar',
        text2: `${wine.name} was saved 🍷`,
      });
    }
  };

  const removeFromCellar = (id) => {
    setFavorites(favorites.filter((wine) => wine.id !== id));
    setRatings((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  
    Toast.show({
      type: 'info',
      text1: 'Removed from Cellar',
    });
  };

  const rateWine = (id, stars) => {
    setRatings((prev) => ({ ...prev, [id]: stars }));
  };

  return (
    <WineContext.Provider
      value={{
        favorites,
        ratings,
        addToCellar,
        removeFromCellar,
        rateWine,
      }}
    >
      {children}
    </WineContext.Provider>
  );
};

export const useWine = () => useContext(WineContext);
