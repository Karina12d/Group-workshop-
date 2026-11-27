export default function Display({ value, expression }) {
  return (
    <div className="flex flex-col items-end px-2 pb-4">
      <span className="h-7 text-xl text-neutral-500">{expression}</span>
      <span className="max-w-full truncate text-6xl font-light text-white">{value}</span>
    </div>
  )
}
