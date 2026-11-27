// Contenedor común: título + botón "Volver"
export default function Screen({ title, onBack, children }) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      </div>
      {children}
    </div>
  )
}
