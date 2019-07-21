import React, { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../API';
import debounce from 'lodash/debounce';

const useCustomHook = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('redux');
  const handleInputChange = useCallback(e => setQuery(e.target.value), []);

  const getData = useCallback(
    debounce(async ({ query, signal }) => {
      try {
        const { hits: data } = await fetchArticles(query, signal);
        setData(data);
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
  }
}

export default useCustomHook;

// const { data, query, handleInputChange } = useCustomHook();
