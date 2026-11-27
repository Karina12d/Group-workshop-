import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Screen from '../components/Screen'
import { formSchema, GENEROS, INTERESES, CARRERAS, FORM_DEFAULTS } from '../model/formSchema'
import { inputClass } from '../styles/classes'

export default function FormScreen({ onBack }) {
  const [sent, setSent] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: FORM_DEFAULTS,
  })

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600)) // simula fetch al backend
    setSent(data)
    reset()
  }

  const Err = ({ name }) => errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>

  return (
    <Screen title="Formulario" onBack={onBack}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Nombre</label>
            <input {...register('nombre')} className={inputClass} />
            <Err name="nombre" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
            <input {...register('email')} className={inputClass} />
            <Err name="email" />
          </div>
        </div>

        {/* Radio buttons */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-600">Género</p>
          <div className="flex gap-4">
            {GENEROS.map((g) => (
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
          <select {...register('carrera')} className={inputClass}>
            <option value="">-- Selecciona --</option>
            {CARRERAS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
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
          <textarea rows={4} {...register('comentario')} className={inputClass} />
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
