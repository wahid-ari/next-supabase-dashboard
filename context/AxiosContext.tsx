import { createContext, ReactNode } from 'react';
import nookies from 'nookies';
import axios from 'axios';

export const AxiosContext = createContext(null);

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const token = nookies.get(null, 'token');

  // // can be set up here, or in page file like in pages/data.js
  if (token.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    // console.log("Axios Header Auth SET: ", token.token)
  } else {
    axios.defaults.headers.common['Authorization'] = '';
    // console.log("Axios Header Auth UNSET: ", token.token)
  }

  return <AxiosContext.Provider value={{ token }}>{children}</AxiosContext.Provider>;
};
