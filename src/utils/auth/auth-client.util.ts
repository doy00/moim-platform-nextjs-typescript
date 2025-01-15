export const getLocalStorageItem = (keyName: string) => {
  return window.localStorage.getItem(keyName);
};

export const setLocalStorageItem = (keyName: string, keyValue: string) => {
  window.localStorage.setItem(keyName, keyValue);
};

export const removeLocalStorageItem = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};
