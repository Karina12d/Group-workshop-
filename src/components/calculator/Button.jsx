const styles = {
  number: 'bg-neutral-800 text-white active:bg-neutral-600',
  dot: 'bg-neutral-800 text-white active:bg-neutral-600',
  operator: 'bg-orange-500 text-white active:bg-orange-300',
  equals: 'bg-orange-500 text-white active:bg-orange-300',
  clear: 'bg-neutral-400 text-black active:bg-neutral-200',
  delete: 'bg-neutral-400 text-black active:bg-neutral-200',
}

export default function Button({ label, type, className = '', active = false, onClick }) {
  // Si el operador está seleccionado, se pinta blanco
  const color = active ? 'bg-white text-orange-500' : styles[type]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${color} ${className} h-full rounded-full text-2xl font-medium transition-colors`}
    >
      {label}
    </button>
  )
}
