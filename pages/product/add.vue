<template>
  <div>
    <div>
      <span class="seperator">General</span>
      <div class="row">
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedBrand"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedModel"
          :items="models"
          label="Model"
        />
      </div>
    </div>
    <div>
      <span class="seperator">Variants</span>
      <div class="row">
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedMemory"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedColor"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="row">
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedOS"
          :items="osVersions"
          label="OS Version"
        />
        <NumberInput
          class="col-md col-xs"
          v-model.number="year"
          :initValue="year"
          label="Year"
        />
      </div>
      <div class="row">
        <NumberInput
          class="col-md col-xs"
          v-model.number="price"
          label="Price ($)"
          :decimal="true"
        />
        <div class="col-md col-xs">
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
            :key="uploadedImage.id"
            :src="uploadedImage.value"
            @mousedown="removeImage(uploadedImage.id)"
          />
        </div>
      </div>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="addProduct" />
      </div>
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
import { Option, Image } from '~/types'
export default {
  data(): {
    uploadedImages: Option[]
    selectedBrand: Option
    selectedModel: Option
    selectedMemory: Option
    selectedColor: Option
    selectedOS: Option
    year: number
    price: number
  } {
    return {
      // initial variables for the page
      uploadedImages: [] as Option[],
      selectedBrand: {} as Option,
      selectedModel: {} as Option,
      selectedMemory: {} as Option,
      selectedColor: {} as Option,
      selectedOS: {} as Option,
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
      return getModelsByBrandKey(this.selectedBrand.id)
    },
    osVersions() {
      return getOSVersionsByBrand(this.selectedBrand.id)
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
        Validator.isObjectEmpty(this.selectedBrand) ||
        Validator.isObjectEmpty(this.selectedModel) ||
        Validator.isObjectEmpty(this.selectedMemory) ||
        Validator.isObjectEmpty(this.selectedOS) ||
        Validator.isObjectEmpty(this.selectedColor)
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
      const productId = uuidv4()

      // calling action from Vuex to add product along with its image(s)
      // TODO: should implement rollback mechanism here
      try {
        await this.$store.dispatch('products/addProduct', {
          id: productId,
          brand: this.selectedBrand.id,
          model: this.selectedModel.id,
          memory: this.selectedMemory.id,
          color: this.selectedColor.id,
          os: this.selectedOS.id,
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
            id: img.id,
            src: img.value,
            productId: productId,
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

    removeImage(id: string) {
      for (let i = 0; i < this.uploadedImages.length; i++) {
        if (this.uploadedImages[i].id === id) {
          this.uploadedImages.splice(i, 1)
        }
      }
    },

    // parse image to base64 data url
    createBase64Image(imageData: Blob) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImages.push({
          id: uuidv4(),
          value: e.target?.result as string,
        })
      }
      reader.readAsDataURL(imageData)
    },
  },
}
</script>

<style>
.seperator {
  text-decoration: underline;
  font-size: 20px;
}
.row {
  margin: 20px 0;
  display: flex;
  flex: wrap;
  justify-content: space-between;
  align-items: center;
}
.col-md {
  flex-basis: 45%;
}
.btn-container {
  margin-top: 15px;
  margin-left: 10px;
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
