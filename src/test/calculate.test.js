import { describe, it, expect } from 'vitest'
import { calculate } from '../utils/calculate'

describe('calculate', () => {
  it('suma', () => expect(calculate(2, 3, '+')).toBe('5'))
  it('resta', () => expect(calculate(5, 8, '-')).toBe('-3'))
  it('multiplica', () => expect(calculate(4, 3, '×')).toBe('12'))
  it('divide', () => expect(calculate(10, 4, '÷')).toBe('2.5'))
  it('división para cero da Error', () => expect(calculate(5, 0, '÷')).toBe('Error'))
  it('0.1 + 0.2 = 0.3', () => expect(calculate(0.1, 0.2, '+')).toBe('0.3'))
})
