import ProductService from '~/services/ProductService.js'
import ImageService from '~/services/ImageService.js'

export const state = () => ({
  products: [],
  product: {},
  // perPage: 5,
  // productsTotal: 0,
  // filteredProducts: [],
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  // SET_PRODUCTS_TOTAL(state, productsTotal) {
  //   state.productsTotal = productsTotal
  // },
  // SET_FILTERED_PRODUCT(state, filteredProducts) {
  //   state.filteredProducts = filteredProducts
  // },
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },
  DELETE_PRODUCT(state, product) {
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id === product.id) {
        state.products.splice(i, 1)
      }
    }
  },
}

export const actions = {
  fetchProducts({ commit }) {
    return ProductService.getProducts()
      .then((res) => {
        commit('SET_PRODUCTS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // fetchProducts({ commit, state }, page) {
  //   return ProductService.getProducts(state.perPage, page)
  //     .then((res) => {
  //       commit('SET_PRODUCTS_TOTAL', parseInt(res.headers['x-total-count']))
  //       commit('SET_PRODUCTS', res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },

  fetchProduct({ commit, state, getters }, id) {
    if (state.product.id === id) {
      return state.product
    }
    const product = getters.getProductById(id)

    if (product) {
      commit('SET_PRODUCT', product)
    } else {
      return ProductService.getProduct(id)
        .then((res) => {
          commit('SET_PRODUCT', res.data)
          return res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  // filterProduct({ commit }, search) {
  //   return ProductService.getProductsBySearch(search)
  //     .then((res) => {
  //       commit('SET_FILTERED_PRODUCT', res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },

  addProduct({ commit }, product) {
    return ProductService.addProduct(product)
      .then(() => {
        commit('ADD_PRODUCT', product)
        // implement adding attached images
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateProduct({ commit }, product) {
    return ProductService.updateProduct(product).then((res) => {
      commit('SET_PRODUCT', res.data)
    })
  },
  deleteProduct({ commit }, product) {
    return ProductService.updateProduct(product).then((res) => {
      commit('SET_PRODUCT', res.data)
      commit('DELETE_PRODUCT', res.data)
      ImageService.deleteImageByProductId(product.id)
    })
  },
}
export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id)
  },
}
