import Screen from '../components/Screen'
import Display from '../components/calculator/Display'
import Keypad from '../components/calculator/Keypad'
import { useCalculator } from '../hooks/useCalculator'

// Calculadora tipo celular. Recibe `onBack` para regresar al menú.
export default function Calculator({ onBack }) {
  const { display, expression, operator, newNumber, handleButton } = useCalculator()

  return (
    <Screen title="Calculadora" onBack={onBack}>
      <div className="flex justify-center">
        {/* Celular */}
        <div className="flex h-[740px] w-[360px] flex-col justify-end rounded-[50px] border-[10px] border-neutral-700 bg-black p-4 shadow-xl">
          <Display value={display} expression={expression} />
          <Keypad
            onPress={handleButton}
            activeOperator={newNumber ? operator : null}
          />
        </div>
      </div>
    </Screen>
  )
}
