import { useState, useEffect, useRef } from "react";

type DeserializeFunction<T> = (value: string) => T;
type SerializeFunction<T> = (value: T) => string;

interface UseLocalStorageStateOptions<T> {
  serialize?: SerializeFunction<T>;
  deserialize?: DeserializeFunction<T>;
}

// key: name for the data; defaultValue: initial value of data;
// optional Serialize/Deserialize func to handle how data is read and written to local storage
function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T) = "" as T,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageStateOptions<T> = {}
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [state, setState] = useState<T>(() => {
    // tries to setState with the value from local storage of browser;
    // if cannot find, state is set to the defaultValue
    if (typeof window !== "undefined") {
      try {
        const valueInLocalStorage = window.localStorage.getItem(key);
        return valueInLocalStorage
          ? deserialize(valueInLocalStorage)
          : defaultValue instanceof Function
          ? defaultValue()
          : defaultValue;
      } catch (error) {
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
      }
    }
    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef<string>(key);

  // whenever state/key/serialize changes, useEffect is invoked
  useEffect(() => {
    const prevKey = prevKeyRef.current;
    // if key has changed, we remove the previous data
    // and stores new key and data to local storage
    if (prevKey !== key && typeof window !== "undefined") {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    try {
      window.localStorage.setItem(key, serialize(state));
    } catch (error) {}
  }, [key, state, serialize]);

  const removeItem = () => {
    window.localStorage.removeItem(key);
  };

  return [state, setState, removeItem];
}

export default useLocalStorage;
