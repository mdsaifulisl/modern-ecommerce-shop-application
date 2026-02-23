// client/src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem, quantity) => {
    setCartItems((prevItems) => {
      // Check for SAME id AND SAME size
      const existingItem = prevItems.find(
        (item) => item.id === cartItem.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + (quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...cartItem, quantity: quantity || 1 }];
    });
  };

  // Fix: Must use ID and Size to remove the specific variant
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Helper for Header buttons (+ / -)
  const updateQuantity = (id, size, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };


  const clearCart = () => setCartItems([]);

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);
  const cardLength = cartItems.length;
  
  const getSubtotal = () => cartItems.reduce((total, item) => 
    total + (item.discount_price || item.price) * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartCount, 
      getSubtotal,
      cardLength
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);



