import { Image } from './../types/Image.interface'
import apiClient from '~/services/AxiosConfig'

export default {
  getImages(): Promise<any> {
    return apiClient.get('images')
  },
  getImageByProductId(productId: string): Promise<any> {
    return apiClient.get('images?product_id=' + productId)
  },
  addImage(image: Image): Promise<any> {
    return apiClient.post('/images', image)
  },
  async deleteImageByProductId(productId: string): Promise<any> {
    const images = (await apiClient.get(`images?product_id=${productId}`)).data
    images.forEach(async (image: Image) => {
      await apiClient.delete(`images/${image.id}`)
    })
  },
}
