import { useState } from "react";

const useFetch = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    status: null,
  });

  const { data, isLoading, error, status } = state;

  const fetchData = async (url, method, bodyData = null) => {    
    if (!url) return;
    try {
      const options = {
        method: method,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body:
          method == "GET" || method == "DELETE"
            ? null
            : JSON.stringify(bodyData),
      };
      
      const res = await fetch(url, options);
      if(res.ok){
        const data = await res.json();
        setState({ data, isLoading: false, error: null, status: res.status });
      } else {
        setState({ data: null, isLoading: false, error: res.message, status: res.status });
      }
    } catch (error) {
      console.log(error);
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
