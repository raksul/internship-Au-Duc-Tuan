import { Product, Option, ProductEditForm } from '~/types'
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

  addProduct({ commit }, productDetails: ProductEditForm) {
    const productId = uuidv4()
    const product = {
      id: productId,
      brand: productDetails.brand,
      model: productDetails.model,
      memory: productDetails.memory,
      color: productDetails.color,
      os: productDetails.os,
      year: productDetails.year,
      price: productDetails.price,
      isPublished: true,
      isSold: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return ProductService.addProduct(product)
      .then(() => {
        commit('ADD_PRODUCT', product)
        productDetails.uploadImages.forEach(async (image: Option) => {
          const addedImage = {
            id: image.id,
            src: image.value,
            productId: productId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          await ImageService.addImage(addedImage)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateProduct({ state, commit }, productDetails: ProductEditForm) {
    const product = {
      id: state.product.id,
      brand: productDetails.brand,
      model: productDetails.model,
      memory: productDetails.memory,
      color: productDetails.color,
      os: productDetails.os,
      year: productDetails.year,
      price: productDetails.price,
      images: state.product.images,
      isPublished: true,
      isSold: false,
      isDeleted: false,
      createdAt: state.product.createdAt,
      updatedAt: new Date().toISOString(),
    }
    const { images, ...restProps } = product
    return ProductService.updateProduct(restProps).then((res) => {
      commit('SET_PRODUCT', product)
      commit('UPDATE_PRODUCT', product)
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
