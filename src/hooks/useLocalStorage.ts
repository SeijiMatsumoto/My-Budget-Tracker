import { useState, useEffect } from "react";

type StorageValue<T> = T | null;

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [StorageValue<T>, (value: T) => void] => {
  const isClient = typeof window !== "undefined";

  const storedValue = isClient ? localStorage.getItem(key) : null;
  const initial: StorageValue<T> =
    isClient && storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<StorageValue<T>>(initial);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    isClient && localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    const storedValue = isClient ? localStorage.getItem(key) : null;
    setValue(isClient && storedValue ? JSON.parse(storedValue) : initialValue);
  }, [key, isClient, initialValue]);

  return [value, setStoredValue];
};

export default useLocalStorage;
