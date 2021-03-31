<template>
  <div>
    <div>
      <span>General</span>
      <div class="flex-row">
        <AutoCompleteInput
          v-model="autocompleteBrand"
          class="autocomplete-input"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          v-model="autocompleteModel"
          class="autocomplete-input"
          :items="models"
          label="Model"
        />
      </div>
    </div>
    <div>
      <span>Variants</span>
      <div class="flex-row">
        <AutoCompleteInput
          v-model="autocompleteMemory"
          class="autocomplete-input"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          v-model="autocompleteColor"
          class="autocomplete-input"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="flex-row">
        <AutoCompleteInput
          v-model="autocompleteOS"
          class="autocomplete-input"
          :items="osVersions"
          label="OS Version"
        />
        <InputNumber
          v-model="year"
          class="autocomplete-input"
          :init="new Date().getFullYear()"
          label="Year"
        />
      </div>
      <div class="flex-row">
        <div class="autocomplete-input">
          <InputNumber v-model="price" label="Price ($)" :decimal="true" />
        </div>
        <div class="autocomplete-input">
          <label>Attach image</label>
          <fa icon="paperclip" />
          <img
            v-for="(uploadedImage, index) in uploadedImages"
            :key="index"
            :src="uploadedImage"
            @mousedown="removeImage(index)"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleImages($event)"
          />
        </div>
      </div>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" /></nuxt-link>
        <Button icon="edit" @button-clicked="addProduct" />
      </div>
      <Button icon="info" @button-clicked="showToast" />
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
      year: Number,
      price: Number,
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
    async addProduct() {
      if (
        // check the validation of user's autocomplete input
        VariantsUtil.isObjectEmpty(this.autocompleteBrand) ||
        VariantsUtil.isObjectEmpty(this.autocompleteModel) ||
        VariantsUtil.isObjectEmpty(this.autocompleteMemory) ||
        VariantsUtil.isObjectEmpty(this.autocompleteOS) ||
        VariantsUtil.isObjectEmpty(this.autocompleteColor)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Please check your input again!')
        return
      }
      if (
        !VariantsUtil.isNumber(this.year) ||
        !VariantsUtil.isNumber(this.price)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Make sure Price and Year are numeric!')
        return
      }
      if (this.uploadedImages.length === 0) {
        // product should have at least 1 picture for the visual of listing page
        this.$toast.error('Product should have at least 1 image!')
        return
      }
      // generating a unique key for product using uuid-npm
      const uuid = uuidv4()

      // calling action from Vuex to add product along with its image(s)
      // Note: should implement rollback mechanism here
      try {
        await this.$store.dispatch('products/addProduct', {
          id: uuid,
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        this.uploadedImages.forEach(async (img) => {
          const addedImage = {
            id: uuidv4(),
            src: img,
            product_id: uuid,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          await ImageService.addImage(addedImage)
        })
        this.$toast.success('Added Successfully!')
        this.$router.push('/')
      } catch (err) {
        this.$toast.error(err)
      }
    },

    // loop through uploaded image(s) and convert them to base64
    handleImages(e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const selectedImage = e.target.files[0]
        this.createBase64Image(selectedImage)
      }
    },

    removeImage(index) {
      // this.$refs.imageInput.files.splice(index, 1)
      // this.imageInput.files.splice(index, 1)
      this.uploadedImages.splice(index, 1)
    },

    // parse image to base64 data url
    createBase64Image(image) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.uploadedImages.push(e.target.result)
      }
      reader.readAsDataURL(image)
    },

    showToast() {
      this.$toast.success('Clicked!')
    },
  },
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
  margin: 0 5px;
}
img:hover {
  outline: 2px solid red;
}
.btn-container {
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-row {
  margin: 20px 0px;
  display: flex;
  flex: wrap;
  justify-content: space-around;
  align-items: center;
}
.autocomplete-input {
  width: 40%;
}
</style>
