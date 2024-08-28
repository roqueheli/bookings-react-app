import { useState } from "react";

const useFetch = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    status: null,
  });

  const { data, isLoading, error, status } = state;

  const fetchData = async (url, method, bodyData = null, token = null) => {    
    if (!url) return { data: null, status: null, error: 'URL missing' };

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    
    // Agregar el token al encabezado si está presente
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const options = {
        method: method,
        headers: headers,
        body:
          method == "GET" || method == "DELETE"
            ? null
            : JSON.stringify(bodyData),
      };
      
      const res = await fetch(url, options);
      const resultData = res.ok ? await res.json() : null;
      const resultStatus = res.status;

      setState({
        data: resultData,
        isLoading: false,
        error: res.ok ? null : res.statusText,
        status: resultStatus,
      });
      
      return { data: resultData, status: resultStatus, error: res.ok ? null : res.statusText };
    } catch (error) {
      return { data: null, status: null, error: error.message };
    }
  };

  return {
    data,
    isLoading,
    error,
    status,
    fetchData,
  };
};

export default useFetch;
