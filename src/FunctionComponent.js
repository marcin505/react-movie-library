import React, { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from './API';

const FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('redux');
  const handleInputChange = useCallback(e => setQuery(e.target.value), []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async() => {
      try {
        const { hits: data } = await fetchArticles(query, signal);
        setData(data);
      } catch(error) {}
    })();

    return () => controller.abort();
  }, [query]);

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
        ))}
      </ul>
    </>
  );
}

export default FunctionComponent;