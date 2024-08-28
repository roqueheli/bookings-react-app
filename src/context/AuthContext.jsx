import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || null);
  const [user, setUser] = useState({ token: "", id: "", name: "" });
  const { fetchData } = useFetch();
  const location = useLocation();

  useEffect(() => {
    if (authToken !== null) {
      try {
        const decodedToken = jwtDecode(authToken);

        // Verificar si el token ha expirado
        const currentTime = Date.now() / 1000; // Convertir a segundos
        if (decodedToken.exp < currentTime) {
          logout(); // Si el token ha expirado, hacer logout
        } else {
          setUser({
            token: authToken,
            id: decodedToken.id,
            name: decodedToken.name,
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Si hay algún error al decodificar el token, hacer logout
      }
    }
  }, [authToken]);

  const refreshToken = async () => {
    try {
      const { data, status } = await fetchData(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
        "POST",
        { token: authToken }
      );

      if (status !== 200) {
        throw new Error("Error al refrescar el token");
      }

      Cookies.set("authToken", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      const decodedToken = jwtDecode(data.token);
      setUser({
        token: data.token,
        id: decodedToken.id,
        name: decodedToken.name,
      });
      setAuthToken(data.token); // Actualiza el token en el estado

      return { success: true, status };
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); // Si falla el refresh, hacer logout
      return { success: false, message: error.message, status: error.status };
    }
  };

  const login = async (email, password) => {
    try {
      const { data, status } = await fetchData(
        location.pathname.includes("/admin")
          ? `${import.meta.env.VITE_BASE_URL}/auth/admin-login`
          : `${import.meta.env.VITE_BASE_URL}/auth/login`,
        "POST",
        { email, password }
      );

      if (status !== 200) {
        throw new Error("Error en la autenticación");
      }

      Cookies.set("authToken", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      const decodedToken = jwtDecode(data.token);
      setUser({
        token: data.token,
        id: decodedToken.id,
        name: decodedToken.name,
      });

      return { success: true, status };
    } catch (error) {
      return { success: false, message: error.message, status: error.status };
    }
  };

  const register = async (userDetails) => {    
    const token = Cookies.get("authToken");
    try {
      const { data, status } = userDetails.user_id
        ? await fetchData(
            `${import.meta.env.VITE_BASE_URL}/users/update`,
            "PUT",
            userDetails,
            token
          )
        : await fetchData(
            `${import.meta.env.VITE_BASE_URL}/auth/register`,
            "POST",
            userDetails
          );

      if (status !== 200 || status === null) {
        throw new Error("Error en el registro");
      }

      if (!userDetails.user_id) {
        Cookies.set("authToken", data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        const decodedToken = jwtDecode(data.token);
        setUser({
          token: data.token,
          id: decodedToken.id,
          name: decodedToken.name,
        });
      }

      return { success: true, status };
    } catch (error) {
      return { success: false, message: error.message, status: error.status };
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
    setUser({ token: "", id: "", name: "" });
  };

  const value = {
    authToken,
    login,
    register,
    logout,
    refreshToken,
    isLoggedIn: !!authToken || user.token,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
