import { Product, Option, ProductEdit } from '~/types'
import { v4 as uuidv4 } from 'uuid'
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
  UPDATE_PRODUCT(state, product: Product) {
    state.products[
      state.products.findIndex((item: Product) => item.id === product.id)
    ] = product
  },
  DELETE_PRODUCT(state, product: Product) {
    state.products = state.products.filter(
      (item: Product) => item.id !== product.id
    )
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

  addProduct({ commit }, productDetails: ProductEdit) {
    const productId = uuidv4()
    const currentTime = new Date().toISOString()
    const product = {
      id: productId,
      ...productDetails,
      isPublished: true,
      isSold: false,
      isDeleted: false,
      createdAt: currentTime,
      updatedAt: currentTime,
    }
    const { uploadImages, ...addedProduct } = product
    console.log(addedProduct)
    return ProductService.addProduct(addedProduct)
      .then(() => {
        commit('ADD_PRODUCT', addedProduct)
        productDetails.uploadImages.forEach(async (image: Option) => {
          const addedImage = {
            id: image.id,
            src: image.value,
            productId: productId,
            createdAt: currentTime,
            updatedAt: currentTime,
          }
          await ImageService.addImage(addedImage)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateProduct({ state, commit }, productDetails: ProductEdit) {
    const { images, ...updatedProduct } = state.product
    console.log(updatedProduct)
    updatedProduct.brand = productDetails.brand
    updatedProduct.model = productDetails.model
    updatedProduct.memory = productDetails.memory
    updatedProduct.color = productDetails.color
    updatedProduct.os = productDetails.os
    updatedProduct.year = productDetails.year
    updatedProduct.price = productDetails.price
    updatedProduct.updatedAt = new Date().toISOString()
    return ProductService.updateProduct(updatedProduct).then((res) => {
      commit('SET_PRODUCT', updatedProduct)
      commit('UPDATE_PRODUCT', updatedProduct)
    })
  },

  deleteProduct({ commit }, product: Product) {
    const { images, ...restProps } = product
    restProps.isDeleted = true
    return ProductService.updateProduct(restProps).then((res) => {
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
