import { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import { useDebounce } from '../hooks/useDebounce'

const API_URL = 'https://rickandmortyapi.com/api/character/'

export default function ApiSearch({ onBack }) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null) // personaje del modal

  // Solo se llama a la API cuando cambia el valor "debounced"
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')

    fetch(`${API_URL}?name=${encodeURIComponent(debouncedQuery)}`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) return { results: [] }
        if (!res.ok) throw new Error('Error al consultar la API')
        return res.json()
      })
      .then((data) => setItems(data.results))
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

      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
    </Screen>
  )
}

function DetailModal({ item, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-md px-2 text-xl text-slate-500 hover:bg-slate-100">
          ✕
        </button>
        <div className="flex gap-4">
          <img src={item.image} alt={item.name} className="h-28 w-28 rounded-xl object-cover" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">{item.name}</h2>
            <p className="text-sm text-slate-500">{item.species} · {item.gender}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1 text-sm text-slate-700">
          <li><b>Estado:</b> {item.status}</li>
          <li><b>Origen:</b> {item.origin?.name}</li>
          <li><b>Ubicación:</b> {item.location?.name}</li>
          <li><b>Episodios:</b> {item.episode?.length}</li>
        </ul>
      </div>
    </div>
  )
}
