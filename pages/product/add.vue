<template>
  <div>
    <div>
      <span class="seperator">General</span>
      <div class="row">
        <AutoCompleteInput
          class="col"
          v-model="autocompleteBrand"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          class="col"
          v-model="autocompleteModel"
          :items="models"
          label="Model"
        />
      </div>
    </div>
    <div>
      <span class="seperator">Variants</span>
      <div class="row">
        <AutoCompleteInput
          class="col"
          v-model="autocompleteMemory"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          class="col"
          v-model="autocompleteColor"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="row">
        <AutoCompleteInput
          class="col"
          v-model="autocompleteOS"
          :items="osVersions"
          label="OS Version"
        />
        <NumberInput
          class="col"
          v-model="year"
          :initValue="year"
          label="Year"
        />
      </div>
      <div class="row">
        <NumberInput
          class="col"
          v-model="price"
          label="Price ($)"
          :decimal="true"
        />
        <div class="col">
          <label for="upload"
            >Attach images <fa icon="paperclip" class="paper-clip"
          /></label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            multiple
            @change="handleImages($event)"
            style="display: none"
          />
          <img
            class="image"
            v-for="(uploadedImage, index) in uploadedImages"
            :key="index"
            :src="uploadedImage"
            @mousedown="removeImage(index)"
          />
        </div>
      </div>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="addProduct" />
      </div>
      <!-- <Button icon="info" @click="showToast" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import {
  getBrands,
  getModelsByBrandKey,
  getOSVersionsByBrand,
  getMemories,
  getColors,
} from '~/utilities/VariantsUtil'
import Validator from '~/utilities/Validator'
import ImageService from '~/services/ImageService'
import { Option } from '~/types'
export default {
  data(): {
    uploadedImages: string[]
    autocompleteBrand: Option
    autocompleteModel: Option
    autocompleteMemory: Option
    autocompleteColor: Option
    autocompleteOS: Option
    year: number | string
    price: number | string
  } {
    return {
      // initial variables for the page
      uploadedImages: [] as string[],
      autocompleteBrand: {} as Option,
      autocompleteModel: {} as Option,
      autocompleteMemory: {} as Option,
      autocompleteColor: {} as Option,
      autocompleteOS: {} as Option,
      year: new Date().getFullYear(),
      price: 0,
    }
  },
  computed: {
    // fetch all the data for auto-complete components
    brands() {
      return getBrands()
    },
    models() {
      return getModelsByBrandKey(this.autocompleteBrand.id)
    },
    osVersions() {
      return getOSVersionsByBrand(this.autocompleteBrand.id)
    },
    memories() {
      return getMemories()
    },
    colors() {
      return getColors()
    },
  },
  methods: {
    // call action from vuex to add product along with its image(s)
    async addProduct() {
      if (
        // check the validation of user's autocomplete input
        Validator.isObjectEmpty(this.autocompleteBrand) ||
        Validator.isObjectEmpty(this.autocompleteModel) ||
        Validator.isObjectEmpty(this.autocompleteMemory) ||
        Validator.isObjectEmpty(this.autocompleteOS) ||
        Validator.isObjectEmpty(this.autocompleteColor)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Please check your input again!')
        return
      }
      if (!Validator.isNumber(this.year) || !Validator.isNumber(this.price)) {
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
      // TODO: should implement rollback mechanism here
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
          isPublished: true,
          isSold: false,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        this.uploadedImages.forEach(async (img) => {
          const addedImage = {
            id: uuidv4(),
            src: img,
            productId: uuid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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

    removeImage(index: number) {
      // this.$refs.imageInput.files.splice(index, 1)
      // this.imageInput.files.splice(index, 1)
      this.uploadedImages.splice(index, 1)
    },

    // parse image to base64 data url
    createBase64Image(imageData: Blob) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.uploadedImages.push(e.target.result)
      }
      reader.readAsDataURL(imageData)
    },

    showToast() {
      this.$toast.success('Clicked!')
    },
  },
}
</script>

<style scoped>
.seperator {
  text-decoration: underline;
  font-size: 20px;
}
.row {
  margin: 20px 0;
  display: flex;
  flex: wrap;
  justify-content: space-around;
  align-items: center;
}
.col {
  flex-basis: 40%;
}
.btn-container {
  margin: 30px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.paper-clip {
  margin-left: 5px;
  font-size: 30px;
  transition: all 0.1s linear;
}
.paper-clip:hover {
  cursor: pointer;
  transform: scale(1.3);
}
.image {
  width: 30px;
  height: 30px;
  margin: 0 0 0 3px;
}
.image:hover {
  outline: 2px solid red;
}
</style>
