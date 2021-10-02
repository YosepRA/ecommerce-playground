import React, { useState, useEffect } from 'react';
import immer from 'immer';

import ShopContext from './ShopContext.jsx';

const { VITE_API_ENDPOINT } = import.meta.env;

function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const productsData = await fetch(
        `${VITE_API_ENDPOINT}/json/products`,
      ).then((res) => res.json());
      const cartData = await fetch(`${VITE_API_ENDPOINT}/json/cart`).then(
        (res) => res.json(),
      );

      setProducts(productsData);
      setCart(cartData);
    };

    loadData();
  }, []);

  const handleAddItem = async (product) => {
    const productWithAmount = { ...product, amount: 1 };

    await fetch(`${VITE_API_ENDPOINT}/json/cart`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(productWithAmount),
    });

    setCart((prevCart) => prevCart.concat(productWithAmount));
  };

  /* There is no need to update database on amount change. App will start with the 
  amount of "1" for each product in cart. */
  const handleAmountChange = (id, amount) => {
    setCart(
      immer((draft) => {
        const item = draft.find((i) => i.id === id);
        item.amount = amount;
      }),
    );
  };

  const handleRemoveItem = async (id) => {
    await fetch(`${VITE_API_ENDPOINT}/json/cart/${id}`, {
      method: 'DELETE',
    });

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const emptyCart = async () => {
    // Clear cart items from DB too.
    const deleteCartItem = async (id) => {
      await fetch(`${VITE_API_ENDPOINT}/json/cart/${id}`, {
        method: 'DELETE',
      });
    };
    await Promise.all(cart.map((item) => deleteCartItem(item.id)));

    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        handleAddItem,
        handleAmountChange,
        handleRemoveItem,
        emptyCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;
