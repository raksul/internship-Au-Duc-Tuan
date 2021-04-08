import { getBrandByKey, getOSVersionsByBrand } from '~/utilities/VariantsUtil'
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

  isBrandModelMatch(brandKey: string, modelKey: string): boolean {
    let flag = false
    const brand = getBrandByKey(brandKey)
    brand?.models.every((model) => {
      if (model.id === modelKey) {
        flag = true
        return false // stop looping
      }
      return true // continue looping with every
    })
    return flag
  },

  isBrandOSMatch(brandKey: string, osKey: string): boolean {
    let flag = false
    const osVersions = getOSVersionsByBrand(brandKey)
    osVersions?.every((os) => {
      if (os.id === osKey) {
        flag = true
        return false // stop looping
      }
      return true // continue looping with every
    })
    return flag
  },
}
