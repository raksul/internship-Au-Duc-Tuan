import * as variants from '@/variants-temp.json'

export default {
  getOS() {
    return variants.os
  },
  getOSVersionsByKey(key) {
    const versions = []
    variants.os.forEach((os) => {
      if (os.id === key) {
        os.versions.forEach((version) => {
          versions.push(version)
        })
      }
    })
    return versions
  },
  getColors() {
    return variants.colors
  },
  getColorByKey(key) {
    for (let i = 0; i < variants.colors.length; i++) {
      if (variants.colors[i].id === key) {
        return variants.colors[i]
      }
    }
  },
  getMemories() {
    return variants.memories
  },
  getMemoryByKey(key) {
    for (let i = 0; i < variants.memories.length; i++) {
      if (variants.memories[i].id === key) {
        return variants.memories[i]
      }
    }
  },
  getBrands() {
    const brands = []
    variants.os.forEach((os) => {
      os.brands.forEach((brand) => {
        brands.push(brand)
      })
    })
    return brands
  },
  getBrandByKey(key) {
    variants.os.forEach((os) => {
      for (let i = 0; i < os.brands.length; i++) {
        if (os.brands[i].id === key) {
          return os.brands[i]
        }
      }
    })
  },
  getModelsByKey(key) {
    const models = []
    variants.os.forEach((os) => {
      os.brands.forEach((brand) => {
        if (brand.brand === key || brand.id === key) {
          brand.models.forEach((model) => {
            models.push(model)
          })
        }
      })
    })
    return models
  },
}
