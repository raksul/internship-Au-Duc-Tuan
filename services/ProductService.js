import apiClient from '~/services/AxiosConfig'

export default {
  getProducts() {
    return apiClient.get(`/products?is_deleted=false`)
  },
  getProduct(id) {
    return apiClient.get(`products/${id}`)
  },
  addProduct(product) {
    return apiClient.post('/products', product)
  },
  updateProduct(product) {
    return apiClient.put(`products/${product.id}`, product)
  },
  deleteProduct(product) {
    return apiClient.put(`products/${product.id}`, product)
  },
}
