import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

function CartStateProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  return (
    <LocalStateContext.Provider
      value={{ isCartOpen, setIsCartOpen, toggleCart, openCart, closeCart }}
    >
      {children}
    </LocalStateContext.Provider>
  );
}

function useCart() {
  const data = useContext(LocalStateContext);

  return data;
}

export { CartStateProvider, useCart };
