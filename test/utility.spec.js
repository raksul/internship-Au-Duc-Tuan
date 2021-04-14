const {
  formatMoney,
  isObjectEmpty,
  isNumber,
  convertToBase64,
} = require('~/utilities/utility')

describe('utility', () => {
  test('Check the formatMoney() function', () => {
    expect(formatMoney(999)).toStrictEqual('$999.00')
    expect(formatMoney(1000)).toStrictEqual('$1,000.00')
    expect(formatMoney('800.9')).toStrictEqual('$800.90')
    expect(formatMoney('500.99')).toStrictEqual('$500.99')
  })

  test('Check the isObjectEmpty function', () => {
    expect(isObjectEmpty({})).toBe(true)
    expect(isObjectEmpty(null)).toBe(true)
    expect(isObjectEmpty(undefined)).toBe(true)
    expect(isObjectEmpty({ id: 1, name: 'Jest' })).toBe(false)
  })

  test('Check the isNumber function', () => {
    expect(isNumber(1000)).toBe(true)
    expect(isNumber(250.01)).toBe(true)
    expect(isNumber('200')).toBe(true)
    expect(isNumber('50.05')).toBe(true)
    expect(isNumber('abc')).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })
})
