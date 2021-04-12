import { Option } from '~/types/Option.interface'

export default {
  // parse image to base64 data url
  convertToBase64(imageData: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(imageData)
      reader.onload = () => resolve(reader.result.toString())
      reader.onerror = (error) => reject(error)
    })
  },
}
