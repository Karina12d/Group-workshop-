const OPTIONS = [
  { id: 'sum', label: 'Suma', icon: '➕', desc: 'Suma de dos números' },
  { id: 'calculator', label: 'Calculadora', icon: '🧮', desc: 'Calculadora tipo celular' },
  { id: 'api', label: 'API', icon: '🔎', desc: 'Búsqueda con debounce' },
  { id: 'form', label: 'Formulario', icon: '📝', desc: 'React Hook Form + Zod' },
]

export default function Menu({ user, onSelect, onLogout }) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Hola, {user} 👋</h1>
        <button onClick={onLogout} className="text-sm font-medium text-red-600 hover:underline">
          Cerrar sesión
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-3xl">{opt.icon}</div>
            <div className="mt-2 text-lg font-semibold text-slate-800">{opt.label}</div>
            <div className="text-sm text-slate-500">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
