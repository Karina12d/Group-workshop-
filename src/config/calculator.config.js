export const MAX_DIGITS = 9

export const BUTTONS = [
  { label: 'C', type: 'clear' },
  { label: '÷', type: 'operator' },
  { label: '×', type: 'operator' },
  { label: 'DEL', type: 'delete' },

  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '-', type: 'operator' },

  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '+', type: 'operator' },

  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '=', type: 'equals', className: 'row-span-2' },

  { label: '0', type: 'number', className: 'col-span-2' },
  { label: '.', type: 'dot' },
]
