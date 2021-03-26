<template>
  <div>
    <div>
      <span>General</span>
      <div>
        <label>Brand</label>
        <BaseAutoCompleteInput v-model="autocompleteBrand" :items="brands" />
      </div>
      <div>
        <label>Model</label>
        <BaseAutoCompleteInput v-model="autocompleteModel" :items="models" />
      </div>
    </div>
    <div>
      <span>Varians</span>
      <div>
        <label>Memory Size</label>
        <BaseAutoCompleteInput v-model="autocompleteMemory" :items="memories" />
      </div>
      <div>
        <label>Color</label>
        <BaseAutoCompleteInput v-model="autocompleteColor" :items="colors" />
      </div>
      <div>
        <label>OS Version</label>
        <BaseAutoCompleteInput v-model="autocompleteOS" :items="osVersions" />
      </div>
      <div>
        <label>Year</label>
        <input v-model="year" type="number" />
      </div>
      <div>
        <label>Price</label>
        <input v-model="price" type="number" />
      </div>
      <div>
        <label>Attach image</label>
        <fa icon="paperclip" />
        <img
          v-for="(uploadedImage, index) in uploadedImages"
          :key="index"
          :src="uploadedImage"
        />
        <input type="file" accept="image/*" multiple @change="handleImages" />
      </div>
      <button @click="addProduct">Click</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import VariantsUtil from '~/services/VariantsUtil.js'
import ImageService from '~/services/ImageService.js'
export default {
  data() {
    return {
      // initial variables for the page
      uploadedImages: [],
      autocompleteBrand: {},
      autocompleteModel: {},
      autocompleteMemory: {},
      autocompleteColor: {},
      autocompleteOS: {},
      year: '',
      price: '',
    }
  },
  computed: {
    // fetch all the data for auto-complete components
    brands() {
      return VariantsUtil.getBrands()
    },
    models() {
      return VariantsUtil.getModelsByBrandKey(this.autocompleteBrand.id)
    },
    osVersions() {
      return VariantsUtil.getOSVersionsByBrand(this.autocompleteBrand.id)
    },
    memories() {
      return VariantsUtil.getMemories()
    },
    colors() {
      return VariantsUtil.getColors()
    },
  },
  methods: {
    // call action from vuex to add product along with its image(s)
    // Note: need to add validation
    async addProduct() {
      this.addedProduct = {
        id: uuidv4(),
        brand: this.autocompleteBrand.id,
        model: this.autocompleteModel.id,
        memory: this.autocompleteMemory.id,
        color: this.autocompleteColor.id,
        os: this.autocompleteOS.id,
        year: this.year,
        price: this.price,
        is_published: true,
        is_sold: false,
        is_deleted: false,
        created_at: new Date().toDateString,
        updated_at: new Date().toDateString,
      }

      // calling action from Vuex to add product along with its image(s)
      // Note: should implement rollback mechanism here
      await this.$store.dispatch('products/addProduct', this.addedProduct)
      await this.uploadedImages.forEach((img) => {
        const addedImage = {
          id: uuidv4(),
          src: img,
          product_id: this.addedProduct.id,
        }
        ImageService.addImage(addedImage)
      })
    },

    // loop through uploaded image(s) and convert them to base64
    handleImages(e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const selectedImage = e.target.files[0]
        this.createBase64Image(selectedImage)
      }
    },

    // parse image to base64 data url
    createBase64Image(image) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.uploadedImages.push(e.target.result)
      }
      reader.readAsDataURL(image)
    },
  },
}
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
