import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: false,
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json',
  },
})

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
}
