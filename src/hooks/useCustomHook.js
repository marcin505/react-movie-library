import { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../API';
import debounce from 'lodash/debounce';

const useCustomHook = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('redux');
  const [loading, setLoading] = useState(false);
  const handleInputChange = useCallback(e => setQuery(e.target.value), []);

  const getData = useCallback(
    debounce(async ({ query, signal }) => {
      setLoading(true);
      try {
        const { hits: data } = await fetchArticles(query, signal);
        setData(data);
        setLoading(false);
      } catch (error) {}
    }, 1000),
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getData({signal, query});
    return () => controller.abort();
  }, [query, getData]);

  return {
    data,
    query,
    handleInputChange,
    loading,
  }
}

export default useCustomHook;
