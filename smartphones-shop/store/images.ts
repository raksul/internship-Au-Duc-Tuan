import ImageService from '~/services/ImageService.js'

export const state = () => ({
  images: [],
  image: {},
})

export const mutations = {
  SET_IMAGES(state, images) {
    state.images = images
  },
  SET_IMAGE(state, image) {
    state.image = image
  },
  ADD_IMAGE(state, image) {
    state.images.push(image)
  },
}

export const actions = {
  fetchImages({ commit }) {
    return ImageService.getImages().then((res) => {
      commit('SET_IMAGES', res.data)
    })
  },
  fetchImage({ commit }, productId) {
    return ImageService.getImageByProductId(productId)
      .then((res) => {
        commit('SET_IMAGE', res.data)
        // implement better error handling codes here
        console.log(res.data)
      })
      .catch((err) => {
        // implement better error handling codes here
        console.log(err)
      })
  },
  addImage({ commit }, image) {
    image.created_at = new Date().toString
    image.updated_at = new Date().toString
    return ImageService.addImage(image).then((res) => {
      // implement better error handling codes here
      console.log('Added')
    })
  },
}
