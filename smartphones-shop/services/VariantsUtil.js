import * as variants from '~/variants.json'

export default {
  getOS() {
    return variants.os
  },
  getOSVersionsByBrand(key) {
    let versions = []
    variants.os.forEach((os) => {
      for (let i = 0; i < os.brands.length; i++) {
        if (os.brands[i].id === key) {
          versions = os.versions
        }
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
  getOSVersionByKey(key) {
    let os = {}
    for (let i = 0; i < variants.os.length; i++) {
      for (let j = 0; j < variants.os[i].versions.length; j++) {
        if (variants.os[i].versions[j].id === key) {
          os = variants.os[i].versions[j]
        }
      }
    }
    return os
  },
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
  isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === '[object Object]' &&
      JSON.stringify(value) === '{}'
    )
  },
  isNumber(value) {
    if (typeof value !== 'string') return false // we only process strings!
    return (
      !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(value))
    ) // ...and ensure strings of whitespace fail
  },
}
