import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>()

  useEffect(() => {
    const item = window.localStorage.getItem(key)
    setStoredValue(item ? JSON.parse(item) : initialValue)
  }, [key, initialValue])

  function setValue(value: T) {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue] as const;
}