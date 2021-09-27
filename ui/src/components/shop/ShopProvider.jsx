import React, { useState, useEffect } from 'react';
import immer from 'immer';

import ShopContext from './ShopContext.jsx';

const { VITE_API_ENDPOINT } = import.meta.env;

function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`${VITE_API_ENDPOINT}/json/products`);
      const data = await response.json();

      setProducts(data);

      // Only for development. Delete later.
      // const cartItems = data
      //   .slice(0, 3)
      //   .map((item) => ({ ...item, amount: 1 }));
      // setCart(cartItems);
    };

    loadData();
  }, []);

  const handleAddItem = (product) => {
    setCart((prevCart) => {
      const productWithAmount = { ...product, amount: 1 };
      return prevCart.concat(productWithAmount);
    });
  };

  const handleAmountChange = (id, amount) => {
    setCart(
      immer((draft) => {
        const item = draft.find((i) => i.id === id);
        item.amount = amount;
      }),
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        handleAddItem,
        handleAmountChange,
        handleRemoveItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;
