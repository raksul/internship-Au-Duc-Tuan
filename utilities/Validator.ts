export default {
  isObjectEmpty(value: Object): boolean {
    return (
      Object.prototype.toString.call(value) === '[object Object]' &&
      JSON.stringify(value) === '{}'
    )
  },
  isNumber(value: any): boolean {
    // if (typeof value !== 'string') return false // we only process strings!
    // return (
    //   !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    //   !isNaN(parseFloat(value))
    // ) // ...and ensure strings of whitespace fail
    return !isNaN(value) && value !== ''
  },
}
