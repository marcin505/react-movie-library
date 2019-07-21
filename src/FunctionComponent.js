import React, { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from './API';
import debounce from 'lodash/debounce';
// import useCustomHook from './hooks/useCustomHook';

const FunctionComponent = () => {
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

  return (
    <>
      <h2>Function Component</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {data.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))
        }
      </ul>
    </>
  );
}

export default FunctionComponent;