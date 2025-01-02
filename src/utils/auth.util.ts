export const setItemWithExpireTime = (keyName: string, keyValue: string, tts: number) => {
  const obj = {
    value: keyValue,
    expire: Date.now() + tts,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem(keyName, objString);
};

export const getItemWithExpireTime = (keyName: string): string | null => {
  const objString = window.localStorage.getItem(keyName);
  if (!objString) return null;
  const obj = JSON.parse(objString);
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem(keyName);
    return null;
  }
  return obj.value;
};

export const removeItem = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};
