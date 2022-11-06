/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';

const globalContext = createContext({});

export function GolbalContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({ id: 'sagar' });

  return (
    <globalContext.Provider value={{
      cartItems, userDetails, setUserDetails, setCartItems,
    }}
    >
      {children}
    </globalContext.Provider>
  );
}

export const useCartItems = () => {
  const { cartItems, setCartItems } = useContext(globalContext);
  return [cartItems, setCartItems];
};

export const useUserDetails = () => {
  const { userDetails, setUserDetails } = useContext(globalContext);
  return [userDetails, setUserDetails];
};
