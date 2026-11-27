import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Screen from '../components/Screen'

// Esquema de validación con Zod
const schema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  genero: z.enum(['masculino', 'femenino', 'otro'], { message: 'Selecciona una opción' }),
  carrera: z.string().min(1, 'Selecciona una carrera'),
  intereses: z.array(z.string()).min(1, 'Elige al menos un interés'),
  comentario: z.string().max(200, 'Máximo 200 caracteres').optional(),
  terminos: z.literal(true, { message: 'Debes aceptar los términos' }),
})

const INTERESES = ['Frontend', 'Backend', 'Móvil', 'IA']

export default function FormScreen({ onBack }) {
  const [sent, setSent] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '', email: '', carrera: '', intereses: [], comentario: '', terminos: false },
  })

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600)) // simula fetch al backend
    setSent(data)
    reset()
  }

  const input = 'w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400'
  const Err = ({ name }) => errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>

  return (
    <Screen title="Formulario" onBack={onBack}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Nombre</label>
            <input {...register('nombre')} className={input} />
            <Err name="nombre" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
            <input {...register('email')} className={input} />
            <Err name="email" />
          </div>
        </div>

        {/* Radio buttons */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-600">Género</p>
          <div className="flex gap-4">
            {['masculino', 'femenino', 'otro'].map((g) => (
              <label key={g} className="flex items-center gap-2 capitalize">
                <input type="radio" value={g} {...register('genero')} /> {g}
              </label>
            ))}
          </div>
          <Err name="genero" />
        </div>

        {/* Dropdown */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Carrera</label>
          <select {...register('carrera')} className={input}>
            <option value="">-- Selecciona --</option>
            <option value="computacion">Computación</option>
            <option value="sistemas">Sistemas</option>
            <option value="software">Software</option>
          </select>
          <Err name="carrera" />
        </div>

        {/* Checkboxes múltiples */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-600">Intereses</p>
          <div className="flex flex-wrap gap-4">
            {INTERESES.map((i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" value={i} {...register('intereses')} /> {i}
              </label>
            ))}
          </div>
          <Err name="intereses" />
        </div>

        {/* TextArea */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Comentario</label>
          <textarea rows={4} {...register('comentario')} className={input} />
          <Err name="comentario" />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('terminos')} /> Acepto los términos
          </label>
          <Err name="terminos" />
        </div>

        <div className="flex justify-end">
          <button
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Submit'}
          </button>
        </div>
      </form>

      {sent && (
        <pre className="mt-6 overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-green-300">
          {JSON.stringify(sent, null, 2)}
        </pre>
      )}
    </Screen>
  )
}
