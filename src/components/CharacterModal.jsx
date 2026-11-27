// Modal con el detalle de un personaje
export default function CharacterModal({ item, onClose }) {
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
