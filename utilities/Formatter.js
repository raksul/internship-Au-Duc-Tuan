export default {
  formatMoney(price) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',

      // These options are needed to round to whole numbers if that's what you want.
      // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })
    return formatter.format(price)
  },
  snakeToCamel(str) {
    return str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase())
  },
  isObject(obj) {
    return (
      obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
    )
  },
  keysToCamel(obj) {
    if (this.isObject(obj)) {
      const n = {}

      Object.keys(obj).forEach((k) => {
        n[this.snakeToCamel(k)] = this.keysToCamel(obj[k])
      })
      return n
    } else if (Array.isArray(obj)) {
      return obj.map((i) => {
        return this.keysToCamel(i)
      })
    }
    return obj
  },
}
