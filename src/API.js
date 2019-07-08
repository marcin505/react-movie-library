export const baseURL = 'https://hn.algolia.com/api/v1/search';

export default (url) => fetch(
  url
).then(response => response.json());
