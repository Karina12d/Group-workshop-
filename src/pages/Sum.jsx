import { useState } from 'react'
import Screen from '../components/Screen'
import { sumar } from '../utils/math'
import { inputClass, primaryButton } from '../styles/classes'

export default function Sum({ onBack }) {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null)

  const handleSum = () => {
    if (num1 === '' || num2 === '') {
      setResult('Ingresa ambos números')
      return
    }
    setResult(sumar(num1, num2))
  }

  return (
    <Screen title="Suma de dos números" onBack={onBack}>
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-2">
          <input type="number" placeholder="Número 1" value={num1} onChange={(e) => setNum1(e.target.value)} className={inputClass} />
          <input type="number" placeholder="Número 2" value={num2} onChange={(e) => setNum2(e.target.value)} className={inputClass} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
            Resultado: <span className="font-bold">{result ?? '—'}</span>
          </div>
          <button onClick={handleSum} className={primaryButton}>
            Sumar
          </button>
        </div>
      </div>
    </Screen>
  )
}
