import ProductService from '@/services/ProductService.js'

export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_EVENT(state, product) {
    state.product = product
  },
}

export const actions = {
  fetchProducts({ commit }) {
    return ProductService.getProducts().then((res) => {
      commit('SET_PRODUCTS', res.data)
    })
  },
  fetchEvent({ commit }, id) {
    return ProductService.getProduct(id).then((res) => {
      commit('SET_PRODUCT', res.data)
    })
  },
}
