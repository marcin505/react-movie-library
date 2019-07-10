export const baseURL = 'https://hn.algolia.com/api/v1/search';

export const fetchArticles = (query, signal) => fetch(`${baseURL}?query=${query}`, {signal})
  .then(response => response.json());
