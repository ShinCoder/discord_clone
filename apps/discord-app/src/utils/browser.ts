const readSessionStorage = (key: string, fallbackValue: any) => {
  const value = sessionStorage.getItem(key);

  if (value)
    try {
      return JSON.parse(value);
      // eslint-disable-next-line no-empty
    } catch {}

  if (fallbackValue instanceof Function) return fallbackValue();
  return fallbackValue;
};

const writeSessionStorage = (key: string, value: any) => {
  if (value instanceof Function) value = value();

  sessionStorage.setItem(key, JSON.stringify(value));
};

const clearSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

const readLocalStorage = (key: string, fallbackValue: any) => {
  const value = localStorage.getItem(key);

  if (value)
    try {
      return JSON.parse(value);
      // eslint-disable-next-line no-empty
    } catch {}

  if (fallbackValue instanceof Function) return fallbackValue();
  return fallbackValue;
};

const writeLocalStorage = (key: string, value: any) => {
  if (value instanceof Function) value = value();

  localStorage.setItem(key, JSON.stringify(value));
};

const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export {
  readSessionStorage,
  writeSessionStorage,
  clearSessionStorage,
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage
};
