import React, { useState, useEffect, useRef, useCallback } from 'react';
import fetchArticles, { baseURL } from './API';

const FunctionComponent = () => {
  const inputEl = useRef(null);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(`${baseURL}?query=${query}`);

  useEffect(() => {
    let unmounted;
    (async () => {
      const { hits: data } = await fetchArticles(url);
      if (!unmounted) {
        setData(data);
      }
    })();
    inputEl.current.select();
    return () => {
      unmounted = true;
    }
  }, [url]);

  const handleSubmit = useCallback(event => {
    setUrl(`${baseURL}?query=${query}`)
    event.preventDefault();
  }, [query]);

  const handleInputChange = event => setQuery(event.target.value);

  return (
    <>
      <h2>Function Component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          ref={inputEl}
        />
        <button type="submit">Search</button>
      </form>
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