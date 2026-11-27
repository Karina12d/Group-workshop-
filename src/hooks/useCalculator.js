import { useState, useEffect } from 'react'
import { calculate } from '../utils/calculate'
import { MAX_DIGITS } from '../config/calculator.config'

export function useCalculator() {
  const [display, setDisplay] = useState('0')       // número en pantalla
  const [previous, setPrevious] = useState(null)    // primer número
  const [operator, setOperator] = useState(null)    // + - × ÷
  const [newNumber, setNewNumber] = useState(false) // el próximo dígito empieza un número nuevo

  const clear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setNewNumber(false)
  }

  const pressNumber = (num) => {
    if (newNumber || display === 'Error') {
      setDisplay(num)
      setNewNumber(false)
    } else if (display.length < MAX_DIGITS) {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const pressDot = () => {
    if (newNumber || display === 'Error') {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const pressOperator = (op) => {
    if (display === 'Error') return

    // Si ya había una operación pendiente, la resuelve primero (2 + 3 + ...)
    if (operator && !newNumber) {
      const result = calculate(previous, parseFloat(display), operator)
      if (result === 'Error') {
        clear()
        setDisplay('Error')
        return
      }
      setDisplay(result)
      setPrevious(parseFloat(result))
    } else {
      setPrevious(parseFloat(display))
    }

    setOperator(op)
    setNewNumber(true)
  }

  const pressEquals = () => {
    if (!operator || newNumber) return
    const result = calculate(previous, parseFloat(display), operator)
    setDisplay(result)
    setPrevious(null)
    setOperator(null)
    setNewNumber(true)
  }

  const pressDelete = () => {
    if (newNumber || display === 'Error') return
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
  }

  // Decide qué hacer según el tipo de botón
  const handleButton = ({ label, type }) => {
    if (type === 'number') pressNumber(label)
    if (type === 'dot') pressDot()
    if (type === 'operator') pressOperator(label)
    if (type === 'equals') pressEquals()
    if (type === 'clear') clear()
    if (type === 'delete') pressDelete()
  }

  // Permite usar el teclado de la computadora
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') pressNumber(e.key)
      if (e.key === '.') pressDot()
      if (e.key === '+') pressOperator('+')
      if (e.key === '-') pressOperator('-')
      if (e.key === '*') pressOperator('×')
      if (e.key === '/') pressOperator('÷')
      if (e.key === 'Enter') pressEquals()
      if (e.key === 'Backspace') pressDelete()
      if (e.key === 'Escape') clear()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const expression = previous !== null && operator ? `${previous} ${operator}` : ''

  return { display, expression, operator, newNumber, handleButton }
}
