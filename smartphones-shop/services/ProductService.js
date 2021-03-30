import axios from 'axios'
// import VariantsUtil from '~/services/VariantsUtil.js'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: false,
  headers: {
    Accept: 'application.json',
    'Content-Type': 'application/json',
  },
})

export default {
  getProducts() {
    return apiClient.get(`/products?is_deleted=false`)
  },
  // getProducts(perPage, currentPage) {
  //   return apiClient.get(`/products?_limit=${perPage}&page=${currentPage}`)
  // },
  // async getProductsBySearch(search) {
  //   const products = await apiClient.get('/products')
  //   const filteredProducts = []
  //   for (let i = 0; i < products.length; i++) {
  //     const brand = VariantsUtil.getBrandByKey(
  //       products[i].brand
  //     ).value.toLowerCase()
  //     const model = VariantsUtil.getModelByKey(
  //       products[i].model
  //     ).value.toLowerCase()
  //     const color = VariantsUtil.getColorByKey(
  //       products[i].color
  //     ).value.toLowerCase()
  //     const memory = VariantsUtil.getMemoryByKey(
  //       products[i].memory
  //     ).value.toLowerCase()
  //     const price = products[i].price.toString().toLowerCase()
  //     const searchTerm = search.toLowerCase()

  //     if (
  //       brand.includes(searchTerm) ||
  //       model.includes(searchTerm) ||
  //       color.includes(searchTerm) ||
  //       memory.includes(searchTerm) ||
  //       price.includes(searchTerm)
  //     ) {
  //       filteredProducts.push(products[i])
  //     }
  //   }
  //   return filteredProducts
  // },
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
