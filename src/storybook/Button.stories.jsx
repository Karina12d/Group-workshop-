import Button from '../components/calculator/Button'

export default {
  title: 'Calculadora/Button',
  component: Button,
  decorators: [(Story) => <div className="h-[72px] w-[72px]"><Story /></div>],
}

export const Numero = { args: { label: '7', type: 'number' } }
export const Operador = { args: { label: '+', type: 'operator' } }
export const Borrar = { args: { label: 'DEL', type: 'delete' } }
export const Limpiar = { args: { label: 'C', type: 'clear' } }
