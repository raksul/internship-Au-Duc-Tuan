import * as variants from '@/variants.json'

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
    let brand = {}
    for (let i = 0; i < variants.os.length; i++) {
      for (let j = 0; j < variants.os[i].brands.length; j++) {
        if (variants.os[i].brands[j].id === key) {
          brand = variants.os[i].brands[j]
        }
      }
    }
    return brand
  },
  getModelsByBrandKey(key) {
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
  getModelByKey(key) {
    let model = {}
    for (let x = 0; x < variants.os.length; x++) {
      for (let y = 0; y < variants.os[x].brands.length; y++) {
        for (let z = 0; z < variants.os[x].brands[y].models.length; z++) {
          if (variants.os[x].brands[y].models[z].id === key) {
            model = variants.os[x].brands[y].models[z]
          }
        }
      }
    }
    return model
  },
}
