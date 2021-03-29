import ProductService from '~/services/ProductService.js'

export const state = () => ({
  products: [],
  product: {},
  perPage: 5,
  productsTotal: 0,
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  SET_PRODUCTS_TOTAL(state, productsTotal) {
    state.productsTotal = productsTotal
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },
}

export const actions = {
  fetchProducts({ commit, state }, page) {
    return ProductService.getProducts(state.perPage, page)
      .then((res) => {
        commit('SET_PRODUCTS_TOTAL', parseInt(res.headers['x-total-count']))
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
