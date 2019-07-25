export const baseURL = 'https://hn.algolia.com/api/v1/search';

export const fetchArticles = (query, signal) => {
  if (query) {
    return fetch(`${baseURL}?query=${query}`, {signal})
    .then(response => response.json());
  }
};
