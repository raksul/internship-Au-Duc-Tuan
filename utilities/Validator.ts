import { Option, Brand } from '~/types/'
import { getBrandByKey, getOSVersionsByBrand } from '~/utilities/VariantsUtil'
export default {
  isEmptyString(string: any): boolean {
    return string === undefined || string == null || string.length <= 0
      ? true
      : false
  },

  isObjectEmpty(value: Object): boolean {
    return (
      Object.prototype.toString.call(value) === '[object Object]' &&
      JSON.stringify(value) === '{}'
    )
  },

  isNumber(value: any): boolean {
    return !isNaN(value) && value !== ''
  },

  isBrandModelMatch(brandKey: string, modelKey: string): boolean {
    const brand = getBrandByKey(brandKey) as Brand
    return brand.models.some((model: Option) => model.id === modelKey)
  },

  isBrandOSMatch(brandKey: string, osKey: string): boolean {
    const osVersions = getOSVersionsByBrand(brandKey) as Option[]
    return osVersions.some((os) => os.id === osKey)
  },
}
