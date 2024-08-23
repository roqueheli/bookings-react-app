import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useFetch from "../hooks/useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ authToken, setAuthToken ] = useState(Cookies.get('authToken') || null);
  const [ userName, setUserName ] = useState('');
  const { fetchData } = useFetch();

  useEffect(() => {
    if(authToken !== null) {
      const decodedToken = jwtDecode(authToken);
      setUserName(decodedToken.name);
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const { data, status } = await fetchData(`${import.meta.env.VITE_BASE_URL}/auth/login`, "POST", { email, password });

      if (status !== 200) {
        throw new Error('Error en la autenticación');
      }

      Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'Strict' });
      setAuthToken(data.token);

      const decodedToken = jwtDecode(data.token);
      setUserName(decodedToken.name);

      return { success: true, status };
    } catch (error) {
      return { success: false, message: error.message, status: error.status };
    }
  };

  const register = async (userDetails) => {
    try {
      const { data, status } = await fetchData(`${import.meta.env.VITE_BASE_URL}/auth/register`, "POST", userDetails);

      if (status !== 200 || status === null) {
        throw new Error('Error en el registro');
      }

      Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'Strict' });
      setAuthToken(data.token);

      const decodedToken = jwtDecode(data.token);
      setUserName(decodedToken.name);

      return { success: true, status };
    } catch (error) {
      return { success: false, message: error.message, status: error.status };
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setAuthToken(null);
  };

  const value = {
    authToken,
    login,
    register,
    logout,
    isLoggedIn: !!authToken,
    userName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
