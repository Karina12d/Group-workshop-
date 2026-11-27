import Screen from '../components/Screen'

// 👉 Esta pantalla la desarrolla mi compañera.
// Recibe la prop `onBack` para regresar al menú.
export default function Calculator({ onBack }) {
  return (
    <Screen title="Calculadora" onBack={onBack}>
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Aquí va la calculadora (pendiente de merge).
      </div>
    </Screen>
  )
}
