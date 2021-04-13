import * as variants from '~/variants.json'
import { Brand, Option } from '~/types'

export function getOSVersionsByBrand(key: string): Option[] | undefined {
  return variants.os.find((os) => os.brands.find((brand) => brand.id === key))
    ?.versions
}

export function getColors(): Option[] {
  return variants.colors
}

export function getMemories(): Option[] {
  return variants.memories
}

export function getColorByKey(key: string): Option | undefined {
  return variants.colors.find((color) => color.id === key)
}

export function getMemoryByKey(key: string): Option | undefined {
  return variants.memories.find((memory) => memory.id === key)
}

export function getBrands(): Brand[] | undefined {
  let brands: Brand[] = []
  variants.os.forEach((os) => {
    os.brands.forEach((brand) => {
      brands.push(brand)
    })
  })
  return brands
}

// Since Array.forEach() doesn't have any good option to
// break from looping except for throwing Exception
// So it's best to use Array.every() or Array.some() here

// return true: signal Array.every() to continue looping
// return false: signal Array.every() to stop looping
export function getBrandByKey(key: string): Brand | undefined {
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
}
export function getModelsByBrandKey(key: string): Option[] | undefined {
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
}

export function getModelByKey(key: string): Option | undefined {
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
}

export function getOSVersionByKey(key: string): Option | undefined {
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
}

export function isBrandModelMatch(brandKey: string, modelKey: string): boolean {
  const brand = getBrandByKey(brandKey) as Brand
  return brand.models.some((model: Option) => model.id === modelKey)
}

export function isBrandOSMatch(brandKey: string, osKey: string): boolean {
  const osVersions = getOSVersionsByBrand(brandKey) as Option[]
  return osVersions.some((os) => os.id === osKey)
}
