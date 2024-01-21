import React, { useEffect, useState } from 'react'
import { createContext, useContext, useReducer } from 'react';


export const AppContext = createContext(null);

export function ContextProvider({ children }) {
  const [connected, setConnected] = useState(false)

  return (
    <AppContext.Provider value={{ connected, setConnected }}>
      {children}
    </AppContext.Provider>
  );
}





