import React, { createContext, useContext, useState } from 'react';

const WineInventoryContext = createContext();

export const WineInventoryProvider = ({ children }) => {
  const [wines, setWines] = useState([
    {
      id: 1,
      name: 'Cabernet Sauvignon',
      type: 'Red',
      brand: 'Brand A',
      price: 20,
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg',
    },
    {
      id: 2,
      name: 'Chardonnay',
      type: 'White',
      brand: 'Brand B',
      price: 25,
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47996575869489.5c594d0824159.jpg',
    },
  ]);

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