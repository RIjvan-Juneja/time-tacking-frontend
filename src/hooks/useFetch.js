import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`,
        ...options
      );
      const data = await response.json();

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const sendData = useCallback(async (url, payload, options = {}) => {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          ...(options.hasOwnProperty('headers') && { ...options.headers })
        },
      });

      const data = await response.json();

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, fetchData, sendData };
};

export default useFetch;
