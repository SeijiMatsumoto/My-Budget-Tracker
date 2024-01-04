import { useState } from "react";

type StorageValue<T> = T | null;

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [StorageValue<T>, (value: T) => void] => {
  const storedValue = localStorage.getItem(key);
  const initial: StorageValue<T> = storedValue
    ? JSON.parse(storedValue)
    : initialValue;

  const [value, setValue] = useState<StorageValue<T>>(initial);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
