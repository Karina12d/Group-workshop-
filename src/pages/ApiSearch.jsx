import { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import CharacterModal from '../components/CharacterModal'
import { useDebounce } from '../hooks/useDebounce'
import { searchCharacters } from '../api/characterApi'
import { DEBOUNCE_DELAY } from '../config/constants'

export default function ApiSearch({ onBack }) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null) // personaje del modal

  // Solo se llama a la API cuando cambia el valor "debounced"
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')

    searchCharacters(debouncedQuery, controller.signal)
      .then(setItems)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <Screen title="Búsqueda en API" onBack={onBack}>
      <div className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar personaje (debounce 500 ms)..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2">🔍</span>
      </div>

      {loading && <p className="text-slate-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="text-slate-500">Sin resultados.</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
          >
            <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
            <div className="p-2">
              <p className="truncate font-semibold text-slate-800">{item.name}</p>
              <p className="text-xs text-slate-500">{item.species}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && <CharacterModal item={selected} onClose={() => setSelected(null)} />}
    </Screen>
  )
}
