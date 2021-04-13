export function formatMoney(price: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return formatter.format(price)
}

export function convertToBase64(imageData: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(imageData)
    reader.onload = () => resolve(reader.result!.toString())
    reader.onerror = (error) => reject(error)
  })
}

export function isObjectEmpty(value: Object): boolean {
  return (
    Object.prototype.toString.call(value) === '[object Object]' &&
    JSON.stringify(value) === '{}'
  )
}

export function isNumber(value: any): boolean {
  return !isNaN(value) && value !== ''
}
