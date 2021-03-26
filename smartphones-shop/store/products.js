import ProductService from '@/services/ProductService.js'
// import ImageService from '@/services/ImageService.js'

export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product)
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

  addProduct({ commit }, product) {
    product.created_at = new Date().toString
    product.updated_at = new Date().toString
    return ProductService.addProduct(product)
      .then(() => {
        commit('ADD_PRODUCT', product)
        // implement adding attached images
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
export const getters = {
  getProductById: (state) => (id) => {
    return state.products.find((product) => product.id === id)
  },
}
