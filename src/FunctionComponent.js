import React, { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from './API';
import debounce from 'lodash/debounce';
import Loader from './Loader';
// import useCustomHook from './hooks/useCustomHook';

const FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('redux');
  const [loading, setLoading] = useState(false);
  const handleInputChange = useCallback(e => setQuery(e.target.value), []);
  
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getData = debounce(async () => { // usually you’ll want to declare functions needed by an effect inside of it.
        setLoading(true);
        try {
          const { hits: data } = await fetchArticles(query, signal);
          setData(data);
          setLoading(false);
        } catch (error) {}
      }, 1000);
    getData();
    return () => controller.abort(); //clean up function for canceling request from current effect
  }, [query]); //pass values effect depends on
  
  // const { data, query, handleInputChange, loading } = useCustomHook();

  return (
    <>
      <h2>Function Component</h2>
      <input type="text" value={query} onChange={handleInputChange} />
      {!loading ? (
        <ul>
          {data.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FunctionComponent;