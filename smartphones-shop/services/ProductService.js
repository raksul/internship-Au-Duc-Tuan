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
  getProducts(perPage, currentPage) {
    return apiClient.get(`/products?_limit=${perPage}&page=${currentPage}`)
  },
  // async getProductsBySearch(search) {
  //   const products = await apiClient.get('/products')
  //   products.filter((product) => {
  //     const brand = VariantsUtil.getBrandByKey(
  //       product.brand
  //     ).value.toLowerCase()
  //     const model = VariantsUtil.getModelByKey(
  //       product.model
  //     ).value.toLowerCase()
  //     const color = VariantsUtil.getColorByKey(
  //       product.color
  //     ).value.toLowerCase()
  //     const memory = VariantsUtil.getMemoryByKey(
  //       product.memory
  //     ).value.toLowerCase()
  //     const price = product.price.toString().toLowerCase()
  //     const searchTerm = search.toLowerCase()

  //     return (
  //       brand.includes(searchTerm) ||
  //       model.includes(searchTerm) ||
  //       color.includes(searchTerm) ||
  //       memory.includes(searchTerm) ||
  //       price.includes(searchTerm)
  //     )
  //   })
  // },
  getProduct(id) {
    return apiClient.get('products/' + id)
  },
  addProduct(product) {
    return apiClient.post('/products', product)
  },
}
