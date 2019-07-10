import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchArticles } from '../API';

export function useCustomHook() {
    const inputEl = useRef(null);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('redux');
    const handleInputChange = useCallback(event => setQuery(event.target.value), []);

    useEffect(() => {
      var controller = new AbortController();
      var signal = controller.signal;
      (async () => {
        console.log('body');
        try {
          const { hits: data } = await fetchArticles(query, signal);
          setData(data);
        } catch(e) {
          console.log(e);
        }
      })();
      return () => {
        console.log('return');
        controller.abort();
      }
    }, [query]);
  
    return {
      inputEl,
      data,
      query,
      handleInputChange
    };
}

export default useCustomHook;