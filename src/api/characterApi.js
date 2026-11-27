import { API_URL } from '../config/constants'

// Busca personajes por nombre. Devuelve [] si no hay resultados.
export async function searchCharacters(name, signal) {
  const res = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`, { signal })
  if (res.status === 404) return []
  if (!res.ok) throw new Error('Error al consultar la API')
  const data = await res.json()
  return data.results
}
