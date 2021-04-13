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

describe('variantsUtil', () => {
  test('Check the getOSVersionsByBrand function', () => {
    expect(getOSVersionsByBrand('apple')).toStrictEqual([
      {
        id: 'ios8',
        value: 'iOS 8',
      },
      {
        id: 'ios9',
        value: 'iOS 9',
      },
      {
        id: 'ios10',
        value: 'iOS 10',
      },
      {
        id: 'ios11',
        value: 'iOS 11',
      },
      {
        id: 'ios12',
        value: 'iOS 12',
      },
      {
        id: 'ios13',
        value: 'iOS 13',
      },
      {
        id: 'ios14',
        value: 'iOS 14',
      },
    ])
    expect(getOSVersionsByBrand('samsung')).toStrictEqual([
      {
        id: 'android5',
        value: 'Android 5',
      },
      {
        id: 'android6',
        value: 'Android 6',
      },
      {
        id: 'android7',
        value: 'Android 7',
      },
      {
        id: 'android8',
        value: 'Android 8',
      },
      {
        id: 'android9',
        value: 'Android 9',
      },
      {
        id: 'android10',
        value: 'Android 10',
      },
      {
        id: 'android11',
        value: 'Android 11',
      },
    ])

    expect(getOSVersionsByBrand('microsoft')).toStrictEqual([
      {
        id: 'wp7',
        value: 'Windows Phone 7',
      },
      {
        id: 'wp75',
        value: 'Windows Phone 7.5',
      },
      {
        id: 'wp78',
        value: 'Windows Phone 7.8',
      },
      {
        id: 'wp81',
        value: 'Windows Phone 8.1',
      },
      {
        id: 'wp8',
        value: 'Windows Phone 8',
      },
      {
        id: 'wp10',
        value: 'Windows Phone 10',
      },
    ])
  })

  test('Check the getOSVersionByKey function', () => {
    expect(getOSVersionByKey('ios10')).toStrictEqual({
      id: 'ios10',
      value: 'iOS 10',
    })
    expect(getOSVersionByKey('android9')).toStrictEqual({
      id: 'android9',
      value: 'Android 9',
    })
    expect(getOSVersionByKey('wp10')).toStrictEqual({
      id: 'wp10',
      value: 'Windows Phone 10',
    })
  })

  test('Check the getColors function', () => {
    expect(getColors()).toStrictEqual([
      {
        id: 'red',
        value: 'Red',
      },
      {
        id: 'black',
        value: 'Black',
      },
      {
        id: 'pink',
        value: 'Pink',
      },
      {
        id: 'gold',
        value: 'Gold',
      },
      {
        id: 'rose',
        value: 'Rose',
      },
      {
        id: 'white',
        value: 'White',
      },
      {
        id: 'blue',
        value: 'Blue',
      },
      {
        id: 'navy',
        value: 'Navy',
      },
      {
        id: 'silver',
        value: 'Silver',
      },
      {
        id: 'purple',
        value: 'Purple',
      },
    ])
  })

  test('Check the getColorByKey function', () => {
    expect(getColorByKey('black')).toStrictEqual({
      id: 'black',
      value: 'Black',
    })
    expect(getColorByKey('white')).toStrictEqual({
      id: 'white',
      value: 'White',
    })
    expect(getColorByKey('navy')).toStrictEqual({
      id: 'navy',
      value: 'Navy',
    })
  })

  test('Check the getMemories function', () => {
    expect(getMemories()).toStrictEqual([
      {
        id: 'gb4',
        value: '4GB',
      },
      {
        id: 'gb8',
        value: '8GB',
      },
      {
        id: 'gb16',
        value: '16GB',
      },
      {
        id: 'gb32',
        value: '32GB',
      },
      {
        id: 'gb64',
        value: '64GB',
      },
      {
        id: 'gb128',
        value: '128GB',
      },
      {
        id: 'gb256',
        value: '256GB',
      },
      {
        id: 'gb512',
        value: '512GB',
      },
      {
        id: 'tb1',
        value: '1TB',
      },
    ])
  })

  test('Check the getMemoryByKey function', () => {
    expect(getMemoryByKey('gb256')).toStrictEqual({
      id: 'gb256',
      value: '256GB',
    })
    expect(getMemoryByKey('gb512')).toStrictEqual({
      id: 'gb512',
      value: '512GB',
    })
    expect(getMemoryByKey('tb1')).toStrictEqual({
      id: 'tb1',
      value: '1TB',
    })
  })

  test('Check the getBrands function', () => {
    expect(getBrands()).toStrictEqual([
      {
        id: 'apple',
        value: 'Apple',
        models: [
          {
            id: 'ip5',
            value: 'iPhone 5',
          },
          {
            id: 'ip5s',
            value: 'iPhone 5s',
          },
          {
            id: 'ipse',
            value: 'iPhone SE',
          },
          {
            id: 'ip6',
            value: 'iPhone 6',
          },
          {
            id: 'ip6s',
            value: 'iPhone 6s',
          },
          {
            id: 'ip6plus',
            value: 'iPhone 6 Plus',
          },
          {
            id: 'ip6splus',
            value: 'iPhone 6s Plus',
          },
          {
            id: 'ip7',
            value: 'iPhone 7',
          },
          {
            id: 'ip7plus',
            value: 'iPhone 7 Plus',
          },
          {
            id: 'ip8',
            value: 'iPhone 8',
          },
          {
            id: 'ip8plus',
            value: 'iPhone 8 Plus',
          },
          {
            id: 'ipx',
            value: 'iPhone X',
          },
          {
            id: 'ipxr',
            value: 'iPhone XR',
          },
          {
            id: 'ipxs',
            value: 'iPhone XS',
          },
          {
            id: 'ipxsmax',
            value: 'iPhone XS Max',
          },
          {
            id: 'ip11',
            value: 'iPhone 11',
          },
          {
            id: 'ip11pro',
            value: 'iPhone 11 Pro',
          },
          {
            id: 'ip11promax',
            value: 'iPhone 11 Pro Max',
          },
          {
            id: 'ip12',
            value: 'iPhone 12',
          },
          {
            id: 'ip12pro',
            value: 'iPhone 12 Pro',
          },
          {
            id: 'ip12promax',
            value: 'iPhone 12 Pro Max',
          },
        ],
      },
      {
        id: 'samsung',
        value: 'Samsung',
        models: [
          {
            id: 'galaxya21',
            value: 'Galaxy A21',
          },
          {
            id: 'galaxys9',
            value: 'Galaxy S9',
          },
          {
            id: 'galaxynote9',
            value: 'Galaxy Note 9',
          },
          {
            id: 'galaxynote10',
            value: 'Galaxy Note 10',
          },
          {
            id: 'galaxynote20',
            value: 'Galaxy Note 20',
          },
          {
            id: 'galaxynote20ultra',
            value: 'Galaxy Note 20 Ultra',
          },
          {
            id: 'galaxys10',
            value: 'Galaxy S10',
          },
          {
            id: 'galaxys20',
            value: 'Galaxy S20',
          },
          {
            id: 'galaxys21',
            value: 'Galaxy S21',
          },
          {
            id: 'galaxys21ultra',
            value: 'Galaxy S21 Ultra',
          },
        ],
      },
      {
        id: 'google',
        value: 'Google',
        models: [
          {
            id: 'pixel',
            value: 'Pixel',
          },
          {
            id: 'pixelxl',
            value: 'Pixel XL',
          },
          {
            id: 'pixel2',
            value: 'Pixel 2',
          },
          {
            id: 'pixel2xl',
            value: 'Pixel 2XL',
          },
          {
            id: 'pixel3',
            value: 'Pixel 3',
          },
          {
            id: 'pixel3xl',
            value: 'Pixel 3XL',
          },
          {
            id: 'pixel3a',
            value: 'Pixel 3a',
          },
          {
            id: 'pixel3axl',
            value: 'Pixel 3a XL',
          },
          {
            id: 'pixel4',
            value: 'Pixel 4',
          },
          {
            id: 'pixel4xl',
            value: 'Pixel 4XL',
          },
          {
            id: 'pixel4a',
            value: 'Pixel 4a',
          },
          {
            id: 'pixel5',
            value: 'Pixel 5',
          },
        ],
      },
      {
        id: 'vivo',
        value: 'Vivo',
        models: [
          {
            id: 'y30i',
            value: 'Y30i',
          },
          {
            id: 'v20',
            value: 'V20',
          },
        ],
      },
      {
        id: 'microsoft',
        value: 'Microsoft',
        models: [
          {
            id: 'surfaceduo',
            value: 'Surface Duo',
          },
          {
            id: 'lumia650',
            value: 'Lumia 650',
          },
          {
            id: 'lumia950',
            value: 'Lumia 950',
          },
          {
            id: 'lumia950xl',
            value: 'Lumia 950 XL',
          },
          {
            id: 'lumia540',
            value: 'Lumia 540',
          },
          {
            id: 'lumia550',
            value: 'Lumia 550',
          },
        ],
      },
    ])
  })

  test('Check the getBrandByKey function', () => {
    expect(getBrandByKey('apple')).toStrictEqual({
      id: 'apple',
      value: 'Apple',
      models: [
        {
          id: 'ip5',
          value: 'iPhone 5',
        },
        {
          id: 'ip5s',
          value: 'iPhone 5s',
        },
        {
          id: 'ipse',
          value: 'iPhone SE',
        },
        {
          id: 'ip6',
          value: 'iPhone 6',
        },
        {
          id: 'ip6s',
          value: 'iPhone 6s',
        },
        {
          id: 'ip6plus',
          value: 'iPhone 6 Plus',
        },
        {
          id: 'ip6splus',
          value: 'iPhone 6s Plus',
        },
        {
          id: 'ip7',
          value: 'iPhone 7',
        },
        {
          id: 'ip7plus',
          value: 'iPhone 7 Plus',
        },
        {
          id: 'ip8',
          value: 'iPhone 8',
        },
        {
          id: 'ip8plus',
          value: 'iPhone 8 Plus',
        },
        {
          id: 'ipx',
          value: 'iPhone X',
        },
        {
          id: 'ipxr',
          value: 'iPhone XR',
        },
        {
          id: 'ipxs',
          value: 'iPhone XS',
        },
        {
          id: 'ipxsmax',
          value: 'iPhone XS Max',
        },
        {
          id: 'ip11',
          value: 'iPhone 11',
        },
        {
          id: 'ip11pro',
          value: 'iPhone 11 Pro',
        },
        {
          id: 'ip11promax',
          value: 'iPhone 11 Pro Max',
        },
        {
          id: 'ip12',
          value: 'iPhone 12',
        },
        {
          id: 'ip12pro',
          value: 'iPhone 12 Pro',
        },
        {
          id: 'ip12promax',
          value: 'iPhone 12 Pro Max',
        },
      ],
    })
    expect(getBrandByKey('samsung')).toStrictEqual({
      id: 'samsung',
      value: 'Samsung',
      models: [
        {
          id: 'galaxya21',
          value: 'Galaxy A21',
        },
        {
          id: 'galaxys9',
          value: 'Galaxy S9',
        },
        {
          id: 'galaxynote9',
          value: 'Galaxy Note 9',
        },
        {
          id: 'galaxynote10',
          value: 'Galaxy Note 10',
        },
        {
          id: 'galaxynote20',
          value: 'Galaxy Note 20',
        },
        {
          id: 'galaxynote20ultra',
          value: 'Galaxy Note 20 Ultra',
        },
        {
          id: 'galaxys10',
          value: 'Galaxy S10',
        },
        {
          id: 'galaxys20',
          value: 'Galaxy S20',
        },
        {
          id: 'galaxys21',
          value: 'Galaxy S21',
        },
        {
          id: 'galaxys21ultra',
          value: 'Galaxy S21 Ultra',
        },
      ],
    })
    expect(getBrandByKey('google')).toStrictEqual({
      id: 'google',
      value: 'Google',
      models: [
        {
          id: 'pixel',
          value: 'Pixel',
        },
        {
          id: 'pixelxl',
          value: 'Pixel XL',
        },
        {
          id: 'pixel2',
          value: 'Pixel 2',
        },
        {
          id: 'pixel2xl',
          value: 'Pixel 2XL',
        },
        {
          id: 'pixel3',
          value: 'Pixel 3',
        },
        {
          id: 'pixel3xl',
          value: 'Pixel 3XL',
        },
        {
          id: 'pixel3a',
          value: 'Pixel 3a',
        },
        {
          id: 'pixel3axl',
          value: 'Pixel 3a XL',
        },
        {
          id: 'pixel4',
          value: 'Pixel 4',
        },
        {
          id: 'pixel4xl',
          value: 'Pixel 4XL',
        },
        {
          id: 'pixel4a',
          value: 'Pixel 4a',
        },
        {
          id: 'pixel5',
          value: 'Pixel 5',
        },
      ],
    })
  })

  test('Check the getModelsByBrandKey function', () => {
    expect(getModelsByBrandKey('apple')).toStrictEqual([
      {
        id: 'ip5',
        value: 'iPhone 5',
      },
      {
        id: 'ip5s',
        value: 'iPhone 5s',
      },
      {
        id: 'ipse',
        value: 'iPhone SE',
      },
      {
        id: 'ip6',
        value: 'iPhone 6',
      },
      {
        id: 'ip6s',
        value: 'iPhone 6s',
      },
      {
        id: 'ip6plus',
        value: 'iPhone 6 Plus',
      },
      {
        id: 'ip6splus',
        value: 'iPhone 6s Plus',
      },
      {
        id: 'ip7',
        value: 'iPhone 7',
      },
      {
        id: 'ip7plus',
        value: 'iPhone 7 Plus',
      },
      {
        id: 'ip8',
        value: 'iPhone 8',
      },
      {
        id: 'ip8plus',
        value: 'iPhone 8 Plus',
      },
      {
        id: 'ipx',
        value: 'iPhone X',
      },
      {
        id: 'ipxr',
        value: 'iPhone XR',
      },
      {
        id: 'ipxs',
        value: 'iPhone XS',
      },
      {
        id: 'ipxsmax',
        value: 'iPhone XS Max',
      },
      {
        id: 'ip11',
        value: 'iPhone 11',
      },
      {
        id: 'ip11pro',
        value: 'iPhone 11 Pro',
      },
      {
        id: 'ip11promax',
        value: 'iPhone 11 Pro Max',
      },
      {
        id: 'ip12',
        value: 'iPhone 12',
      },
      {
        id: 'ip12pro',
        value: 'iPhone 12 Pro',
      },
      {
        id: 'ip12promax',
        value: 'iPhone 12 Pro Max',
      },
    ])
    expect(getModelsByBrandKey('samsung')).toStrictEqual([
      {
        id: 'galaxya21',
        value: 'Galaxy A21',
      },
      {
        id: 'galaxys9',
        value: 'Galaxy S9',
      },
      {
        id: 'galaxynote9',
        value: 'Galaxy Note 9',
      },
      {
        id: 'galaxynote10',
        value: 'Galaxy Note 10',
      },
      {
        id: 'galaxynote20',
        value: 'Galaxy Note 20',
      },
      {
        id: 'galaxynote20ultra',
        value: 'Galaxy Note 20 Ultra',
      },
      {
        id: 'galaxys10',
        value: 'Galaxy S10',
      },
      {
        id: 'galaxys20',
        value: 'Galaxy S20',
      },
      {
        id: 'galaxys21',
        value: 'Galaxy S21',
      },
      {
        id: 'galaxys21ultra',
        value: 'Galaxy S21 Ultra',
      },
    ])
    expect(getModelsByBrandKey('google')).toStrictEqual([
      {
        id: 'pixel',
        value: 'Pixel',
      },
      {
        id: 'pixelxl',
        value: 'Pixel XL',
      },
      {
        id: 'pixel2',
        value: 'Pixel 2',
      },
      {
        id: 'pixel2xl',
        value: 'Pixel 2XL',
      },
      {
        id: 'pixel3',
        value: 'Pixel 3',
      },
      {
        id: 'pixel3xl',
        value: 'Pixel 3XL',
      },
      {
        id: 'pixel3a',
        value: 'Pixel 3a',
      },
      {
        id: 'pixel3axl',
        value: 'Pixel 3a XL',
      },
      {
        id: 'pixel4',
        value: 'Pixel 4',
      },
      {
        id: 'pixel4xl',
        value: 'Pixel 4XL',
      },
      {
        id: 'pixel4a',
        value: 'Pixel 4a',
      },
      {
        id: 'pixel5',
        value: 'Pixel 5',
      },
    ])
  })

  test('Check the getModelByKey function', () => {
    expect(getModelByKey('ipx')).toStrictEqual({
      id: 'ipx',
      value: 'iPhone X',
    })
    expect(getModelByKey('galaxys10')).toStrictEqual({
      id: 'galaxys10',
      value: 'Galaxy S10',
    })
    expect(getModelByKey('pixel5')).toStrictEqual({
      id: 'pixel5',
      value: 'Pixel 5',
    })
  })

  test('Check the isBrandModelMatch function', () => {
    expect(isBrandModelMatch('apple', 'ipx')).toBe(true)
    expect(isBrandModelMatch('apple', 'galaxys10')).toBe(false)
    expect(isBrandModelMatch('samsung', 'galaxys10')).toBe(true)
    expect(isBrandModelMatch('microsoft', 'ip6')).toBe(false)
    expect(isBrandModelMatch('microsoft', 'lumia550')).toBe(true)
  })

  test('Check the isBrandOSMatch function', () => {
    expect(isBrandOSMatch('apple', 'ios10')).toBe(true)
    expect(isBrandOSMatch('apple', 'android9')).toBe(false)
    expect(isBrandOSMatch('samsung', 'android10')).toBe(true)
    expect(isBrandOSMatch('microsoft', 'ios11')).toBe(false)
    expect(isBrandOSMatch('microsoft', 'wp8')).toBe(true)
  })
})
