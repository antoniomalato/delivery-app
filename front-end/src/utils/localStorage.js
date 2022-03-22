export const clearLocalStorage = () => localStorage.clear();

export const saveLocalStorage = (key, data) => localStorage
  .setItem(key, JSON.stringify(data));

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
