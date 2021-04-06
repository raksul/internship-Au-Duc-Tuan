import { Product } from './../types/Product.interface'
import apiClient from '~/services/AxiosConfig'

export default {
  getProducts(): Promise<any> {
    return apiClient.get(`/products?is_deleted=false`)
  },
  getProduct(id: string): Promise<any> {
    return apiClient.get(`products/${id}`)
  },
  addProduct(product: Product): Promise<any> {
    return apiClient.post('/products', product)
  },
  updateProduct(product: Product): Promise<any> {
    return apiClient.put(`products/${product.id}`, product)
  },
  deleteProduct(product: Product): Promise<any> {
    return apiClient.put(`products/${product.id}`, product)
  },
}
