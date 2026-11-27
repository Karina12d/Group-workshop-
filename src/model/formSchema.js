import { z } from 'zod'

// Esquema de validación del formulario (Zod)
export const formSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  genero: z.enum(['masculino', 'femenino', 'otro'], { message: 'Selecciona una opción' }),
  carrera: z.string().min(1, 'Selecciona una carrera'),
  intereses: z.array(z.string()).min(1, 'Elige al menos un interés'),
  comentario: z.string().max(200, 'Máximo 200 caracteres').optional(),
  terminos: z.literal(true, { message: 'Debes aceptar los términos' }),
})

export const GENEROS = ['masculino', 'femenino', 'otro']
export const INTERESES = ['Frontend', 'Backend', 'Móvil', 'IA']
export const CARRERAS = [
  { value: 'computacion', label: 'Computación' },
  { value: 'sistemas', label: 'Sistemas' },
  { value: 'software', label: 'Software' },
]

export const FORM_DEFAULTS = {
  nombre: '', email: '', carrera: '', intereses: [], comentario: '', terminos: false,
}
