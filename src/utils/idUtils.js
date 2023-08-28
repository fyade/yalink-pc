const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const LOWERCASE_ALPHABET = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
]
const CAPITAL_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
]
const SPECIFIC_SYMBOL = [
  '_'
]

export function generateFMessageId() {
  const arr = [...NUMS, ...LOWERCASE_ALPHABET, ...CAPITAL_ALPHABET]
  const len = 10
  let id = ''
  for (let i = 0; i < len; i++) {
    id += arr[Math.floor(Math.random() * arr.length)]
  }
  return id
}