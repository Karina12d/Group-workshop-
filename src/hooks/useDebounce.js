import { useEffect, useState } from 'react'

// Devuelve `value` solo después de que deje de cambiar durante `delay` ms
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer) // si el usuario sigue escribiendo, se cancela
  }, [value, delay])

  return debounced
}
