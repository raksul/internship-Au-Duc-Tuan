import ImageService from '~/services/ImageService'
import { Product } from './../types/Product.interface'
import apiClient from '~/services/AxiosConfig'

export default {
  async getProducts(): Promise<Product> {
    const products = await apiClient.get(`/products?is_deleted=false`)
    await products.data.forEach(async (product: Product) => {
      await ImageService.getImageByProductId(product.id).then((res) => {
        product.images = res.data
      })
    })
    return products.data
  },
  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get(`products/${id}`)
    await ImageService.getImageByProductId(response.data.id).then((res) => {
      response.data.images = res.data
    })
    return response.data
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
