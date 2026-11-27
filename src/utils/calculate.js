// Hace la operación y devuelve el resultado como texto
export function calculate(a, b, operator) {
  let result = 0

  if (operator === '+') result = a + b
  if (operator === '-') result = a - b
  if (operator === '×') result = a * b
  if (operator === '÷') {
    if (b === 0) return 'Error'
    result = a / b
  }

  // Evita resultados como 0.30000000000000004
  return String(parseFloat(result.toPrecision(9)))
}
