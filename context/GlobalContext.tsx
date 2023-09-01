import { createContext, ReactNode, useContext, useState } from 'react';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(false);

  return <GlobalContext.Provider value={{ showNav, setShowNav }}>{children}</GlobalContext.Provider>;
};

export function useShowNav() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a GlobalProvider');
  }
  return context;
}
