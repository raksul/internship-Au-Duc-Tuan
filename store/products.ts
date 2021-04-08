import { Product } from '~/types/Product.interface'
import ProductService from '~/services/ProductService'
import ImageService from '~/services/ImageService'

export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  SET_PRODUCTS(state, products: Product[]) {
    state.products = products
  },
  SET_PRODUCT(state, product: Product) {
    state.product = product
  },
  ADD_PRODUCT(state, product: Product) {
    state.products.push(product)
  },
  DELETE_PRODUCT(state, product: Product) {
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].id === product.id) {
        state.products.splice(i, 1)
      }
    }
  },
  SET_FILTERED_PRODUCTS(state, products: Product[]) {
    state.filteredProducts = products
  },
}

export const actions = {
  async fetchProducts({ commit }) {
    await ProductService.getProducts()
      .then(async (res) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(commit('SET_PRODUCTS', res)), 1000)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  fetchProduct({ commit, state, getters }, id: string) {
    if (state.product.id === id) {
      return state.product
    }
    const product = getters.getProductById(id)

    if (product) {
      commit('SET_PRODUCT', product)
    } else {
      return ProductService.getProduct(id)
        .then((res) => {
          commit('SET_PRODUCT', res)
          return res
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  addProduct({ commit }, product: Product) {
    return ProductService.addProduct(product)
      .then(() => {
        commit('ADD_PRODUCT', product)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateProduct({ commit }, product: Product) {
    return ProductService.updateProduct(product).then((res) => {
      commit('SET_PRODUCT', res.data)
    })
  },

  deleteProduct({ commit }, product: Product) {
    return ProductService.updateProduct(product).then((res) => {
      commit('SET_PRODUCT', res.data)
      commit('DELETE_PRODUCT', res.data)
      ImageService.deleteImageByProductId(product.id)
    })
  },
}
export const getters = {
  getProductById: (state) => (id: string) => {
    return state.products.find((product: Product) => product.id === id)
  },
}
