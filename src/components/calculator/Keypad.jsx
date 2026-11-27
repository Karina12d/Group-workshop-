import Button from './Button'
import { BUTTONS } from '../../config/calculator.config'

export default function Keypad({ onPress, activeOperator }) {
  return (
    <div className="grid auto-rows-[72px] grid-cols-4 gap-3">
      {BUTTONS.map((btn) => (
        <Button
          key={btn.label}
          label={btn.label}
          type={btn.type}
          className={btn.className}
          active={btn.label === activeOperator}
          onClick={() => onPress(btn)}
        />
      ))}
    </div>
  )
}
