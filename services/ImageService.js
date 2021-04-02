import apiClient from '~/services/AxiosConfig'

export default {
  getImages() {
    return apiClient.get('images')
  },
  getImageByProductId(productId) {
    return apiClient.get('images?product_id=' + productId)
  },
  addImage(image) {
    return apiClient.post('/images', image)
  },
  async deleteImageByProductId(productId) {
    const images = (await apiClient.get(`images?product_id=${productId}`)).data
    images.forEach((image) => {
      apiClient.delete(`images/${image.id}`)
    })
  },
}
