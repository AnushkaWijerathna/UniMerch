import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) => i.id === item.id && i.variant === item.variant
      );
      if (exists) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id, size) =>
    setCart((prev) => prev.filter((i) => !(i.id === id && i.variant === size)));

  const updateQty = (id, size, delta) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.variant === size ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );

    const clearCart = () => {
      setCart([]);
    };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart,total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);