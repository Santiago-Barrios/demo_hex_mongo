import { normalizeString } from './normalize-string'

describe('Norma', () => {
  it('should return the same value if it is not a string', () => {
    expect(normalizeString(123)).toBe(123)

    const obj = { key: 'value' }
    expect(normalizeString(obj)).toBe(obj)

    expect(normalizeString(null)).toBe(null)
  })

  it('should normalize a string by removing diacritics', () => {
    const inputString = 'Café mañana'
    const expectedOutput = 'Cafe manana'
    expect(normalizeString(inputString)).toBe(expectedOutput)

    const inputString2 = 'Hello World'
    expect(normalizeString(inputString2)).toBe(inputString2)
  })
})
