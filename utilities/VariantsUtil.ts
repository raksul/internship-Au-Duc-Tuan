import * as variants from '~/variants.json'
import { OS, Brand, Option } from '~/types/index'

export default {
  getOS(): OS[] {
    return variants.os
  },

  getOSVersionsByBrand(key: string): Option[] | undefined {
    return variants.os.find((os) => os.brands.find((brand) => brand.id === key))
      ?.versions
  },

  getColors(): Option[] {
    return variants.colors
  },

  getColorByKey(key: string): Option | undefined {
    return variants.colors.find((color) => color.id === key)
  },

  getMemories(): Option[] {
    return variants.memories
  },

  getMemoryByKey(key: string): Option | undefined {
    return variants.memories.find((memory) => memory.id === key)
  },

  getBrands(): Brand[] | undefined {
    let brands = undefined
    variants.os.forEach((os) => {
      os.brands.forEach((brand) => {
        brands.push(brand)
      })
    })
    return brands
  },

  // Since Array.forEach() doesn't have any good option to
  // break from looping except for throwing Exception
  // So it's best to use Array.every() or Array.some() here

  // return true: signal Array.every() to continue looping
  // return false: signal Array.every() to stop looping

  getBrandByKey(key: string): Brand | undefined {
    let returnedBrand = undefined
    variants.os.every((os) => {
      os.brands.every((brand) => {
        if (brand.id === key) {
          returnedBrand = brand
          return false
        }
        return true
      })
      return true
    })
    return returnedBrand
  },

  getModelsByBrandKey(key: string): Option[] | undefined {
    let models = undefined
    variants.os.every((os) => {
      os.brands.every((brand) => {
        if (brand.id === key) {
          models = brand.models
          return false
        }
        return true
      })
      return true
    })
    return models
  },

  getModelByKey(key: string): Option | undefined {
    let returnedModel = undefined
    variants.os.every((os) => {
      os.brands.every((brand) => {
        brand.models.every((model) => {
          if (model.id === key) {
            returnedModel = model
            return false
          }
          return true
        })
        return true
      })
      return true
    })
    return returnedModel
  },

  getOSVersionByKey(key: string): Option | undefined {
    let returnedVersion = undefined
    variants.os.every((os) => {
      os.versions.every((version) => {
        if (version.id === key) {
          returnedVersion = version
          return false
        }
        return true
      })
      return true
    })
    return returnedVersion
  },
}
