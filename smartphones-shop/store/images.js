// import ProductService from '@/services/ProductService.js'
// import ImageService from '@/services/ImageService.js'

// export const state = () => ({
//   products: [],
//   product: {},
// })

// export const mutations = {
//   SET_PRODUCTS(state, products) {
//     state.products = products
//   },
//   SET_PRODUCT(state, product) {
//     state.product = product
//   },
//   ADD_PRODUCT(state, product) {
//     state.products.push(product)
//   },
// }

// export const actions = {
//   fetchProducts({ commit }) {
//     return ProductService.getProducts()
//       .then((res) => {
//         commit('SET_PRODUCTS', res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   },

//   fetchProduct({ commit, state, getters }, id) {
//     if (state.product.id === id) {
//       return state.product
//     }
//     const event = getters.getProductById(id)

//     if (event) {
//       commit('SET_PRODUCT', event)
//     } else {
//       return ProductService.getProduct(id)
//         .then((res) => {
//           commit('SET_PRODUCT', res.data)
//           return res.data
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   },

//   addProduct({ commit }, product) {
//     return ProductService.addProduct(product)
//       .then(() => {
//         commit('ADD_PRODUCT', product)
//         // implement adding attached images
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   },
// }
