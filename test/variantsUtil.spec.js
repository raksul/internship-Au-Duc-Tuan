const {
  getOSVersionsByBrand,
  getOSVersionByKey,
  getColors,
  getColorByKey,
  getMemories,
  getMemoryByKey,
  getBrands,
  getBrandByKey,
  getModelsByBrandKey,
  getModelByKey,
  isBrandModelMatch,
  isBrandOSMatch,
} = require('~/utilities/variantsUtil')
const variants = require('~/variants.json')

describe('variantsUtil', () => {
  test('Check the getOSVersionsByBrand function', () => {
    const samsungOSVersions = variants.os.find((os) =>
      os.brands.find((brand) => brand.id === 'samsung')
    )?.versions

    expect(getOSVersionsByBrand('samsung')).toBe(samsungOSVersions)
    expect(getOSVersionsByBrand('')).toBe(undefined)
    expect(getOSVersionsByBrand('abcdef')).toBe(undefined)
    expect(getOSVersionsByBrand(null)).toBe(undefined)
    expect(getOSVersionsByBrand(undefined)).toBe(undefined)
  })

  test('Check the getOSVersionByKey function', () => {
    let result = {}
    variants.os.every((os) => {
      os.versions.every((version) => {
        if (version.id === 'ios10') {
          result = version
          return false
        }
        return true
      })
      return true
    })
    expect(getOSVersionByKey('ios10')).toBe(result)
    expect(getOSVersionByKey('')).toBe(undefined)
    expect(getOSVersionByKey('abcdef')).toBe(undefined)
    expect(getOSVersionByKey(null)).toBe(undefined)
    expect(getOSVersionByKey(undefined)).toBe(undefined)
  })

  test('Check the getColors function', () => {
    const colors = variants.colors
    expect(getColors()).toBe(colors)
  })

  test('Check the getColorByKey function', () => {
    const black = variants.colors.find((color) => color.id === 'black')
    const navy = variants.colors.find((color) => color.id === 'navy')
    const silver = variants.colors.find((color) => color.id === 'silver')

    expect(getColorByKey('black')).toBe(black)
    expect(getColorByKey('navy')).toBe(navy)
    expect(getColorByKey('silver')).toBe(silver)
    expect(getColorByKey('')).toBe(undefined)
    expect(getColorByKey('abcdef')).toBe(undefined)
    expect(getColorByKey(null)).toBe(undefined)
    expect(getColorByKey(undefined)).toBe(undefined)
  })

  test('Check the getMemories function', () => {
    const memories = variants.memories
    expect(getMemories()).toBe(memories)
  })

  test('Check the getMemoryByKey function', () => {
    const gb16 = variants.memories.find((memory) => memory.id === 'gb16')
    const gb256 = variants.memories.find((memory) => memory.id === 'gb256')
    const tb1 = variants.memories.find((memory) => memory.id === 'tb1')

    expect(getMemoryByKey('gb16')).toBe(gb16)
    expect(getMemoryByKey('gb256')).toBe(gb256)
    expect(getMemoryByKey('tb1')).toBe(tb1)
    expect(getMemoryByKey('')).toBe(undefined)
    expect(getMemoryByKey('abcdef')).toBe(undefined)
    expect(getMemoryByKey(null)).toBe(undefined)
    expect(getMemoryByKey(undefined)).toBe(undefined)
  })

  test('Check the getBrands function', () => {
    let brands = []
    variants.os.forEach((os) => {
      os.brands.forEach((brand) => {
        brands.push(brand)
      })
    })
    expect(getBrands()).toStrictEqual(brands)
  })

  test('Check the getBrandByKey function', () => {
    let apple = {}
    variants.os.every((os) => {
      os.brands.every((brand) => {
        if (brand.id === 'apple') {
          apple = brand
          return false
        }
        return true
      })
      return true
    })

    expect(getBrandByKey('apple')).toBe(apple)
    expect(getBrandByKey('')).toBe(undefined)
    expect(getBrandByKey('abcdef')).toBe(undefined)
    expect(getBrandByKey(null)).toBe(undefined)
    expect(getBrandByKey(undefined)).toBe(undefined)
  })

  test('Check the getModelsByBrandKey function', () => {
    let appleModels = []
    variants.os.every((os) => {
      os.brands.every((brand) => {
        if (brand.id === 'apple') {
          appleModels = brand.models
          return false
        }
        return true
      })
      return true
    })
    expect(getModelsByBrandKey('apple')).toBe(appleModels)
    expect(getModelsByBrandKey('')).toBe(undefined)
    expect(getModelsByBrandKey('abcdef')).toBe(undefined)
    expect(getModelsByBrandKey(null)).toBe(undefined)
    expect(getModelsByBrandKey(undefined)).toBe(undefined)
  })

  test('Check the getModelByKey function', () => {
    let ipx = {}
    variants.os.every((os) => {
      os.brands.every((brand) => {
        brand.models.every((model) => {
          if (model.id === 'ipx') {
            ipx = model
            return false
          }
          return true
        })
        return true
      })
      return true
    })
    expect(getModelByKey('ipx')).toBe(ipx)
    expect(getModelByKey('')).toBe(undefined)
    expect(getModelByKey('abcdef')).toBe(undefined)
    expect(getModelByKey(null)).toBe(undefined)
    expect(getModelByKey(undefined)).toBe(undefined)
  })

  test('Check the isBrandModelMatch function', () => {
    expect(isBrandModelMatch('apple', 'ipx')).toBe(true)
    expect(isBrandModelMatch('samsung', 'galaxys10')).toBe(true)
    expect(isBrandModelMatch('microsoft', 'lumia550')).toBe(true)
    expect(isBrandModelMatch('apple', 'galaxys10')).toBe(false)
    expect(isBrandModelMatch('microsoft', 'ip6')).toBe(false)
  })

  test('Check the isBrandOSMatch function', () => {
    expect(isBrandOSMatch('apple', 'ios10')).toBe(true)
    expect(isBrandOSMatch('samsung', 'android10')).toBe(true)
    expect(isBrandOSMatch('microsoft', 'wp8')).toBe(true)
    expect(isBrandOSMatch('apple', 'android9')).toBe(false)
    expect(isBrandOSMatch('microsoft', 'ios11')).toBe(false)
  })
})
