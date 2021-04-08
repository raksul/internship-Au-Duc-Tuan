<template>
  <div>
    <div>
      <div class="btn-delete-container">
        <Button
          class="align-right"
          icon="trash"
          type="danger"
          @click="deleteProduct"
        />
      </div>
      <span class="seperator">General</span>
      <div class="row">
        <AutoCompleteInput
          class="col"
          v-model="selectedBrand"
          :initValue="brand"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          class="col"
          v-model="selectedModel"
          :initValue="model"
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
          v-model="selectedMemory"
          :initValue="memory"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          class="col"
          v-model="selectedColor"
          :initValue="color"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="row">
        <AutoCompleteInput
          class="col"
          v-model="selectedOS"
          :initValue="osVersion"
          :items="osVersions"
          label="OS Version"
        />
        <NumberInput
          class="col"
          v-model.number="year"
          :initValue="this.product.year"
          label="Year"
        />
      </div>
      <div class="row">
        <NumberInput
          class="col"
          v-model.number="price"
          :initValue="this.product.price"
          label="Price ($)"
          :decimal="true"
        />
        <div class="col">
          <label>
            Attach images <fa icon="paperclip" class="paper-clip" />
          </label>
          <img
            class="image"
            v-for="(uploadedImage, index) in this.product.images"
            :key="uploadedImage.id"
            :src="uploadedImage.src"
          />
        </div>
      </div>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="updateProduct" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getBrands,
  getModelsByBrandKey,
  getOSVersionsByBrand,
  getMemories,
  getColors,
  getBrandByKey,
  getModelByKey,
  getColorByKey,
  getMemoryByKey,
  getOSVersionByKey,
} from '~/utilities/VariantsUtil'
import Validator from '~/utilities/Validator'
import { Option } from '~/types'
export default {
  data(): {
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
      selectedBrand: {} as Option,
      selectedModel: {} as Option,
      selectedMemory: {} as Option,
      selectedColor: {} as Option,
      selectedOS: {} as Option,
      year: 0,
      price: 0,
    }
  },
  async fetch() {
    // calling action to get product info along with it's image(s) from $store
    await this.$store.dispatch('products/fetchProduct', this.$route.params.id)
  },
  computed: {
    product() {
      this.year = this.$store.state.products.product.year
      this.price = this.$store.state.products.product.price
      return this.$store.state.products.product
    },
    // get data from variants.json file according to product's info
    brand() {
      return getBrandByKey(this.product.brand)
    },
    model() {
      return getModelByKey(this.product.model)
    },
    color() {
      return getColorByKey(this.product.color)
    },
    memory() {
      return getMemoryByKey(this.product.memory)
    },
    osVersion() {
      return getOSVersionByKey(this.product.os)
    },

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
    async updateProduct() {
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
      if (
        !Validator.isBrandModelMatch(
          this.selectedBrand.id,
          this.selectedModel.id
        )
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${this.selectedBrand.value} doesn't support ${this.selectedModel.value}`
        )
        return
      }
      if (
        !Validator.isBrandOSMatch(this.selectedBrand.id, this.selectedOS.id)
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${this.selectedBrand.value} doesn't support ${this.selectedOS.value}`
        )
        return
      }
      if (!Validator.isNumber(this.year) || !Validator.isNumber(this.price)) {
        // inform the user to check inputs again
        this.$toast.error('Make sure Price and Year are numeric!')
        return
      }
      try {
        await this.$store.dispatch('products/updateProduct', {
          id: this.product.id,
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
          createdAt: this.product.createdAt,
          updatedAt: new Date().toISOString(),
        })
        this.$toast.success('Updated Successfully!')
        this.$router.push('/')
      } catch (err) {
        this.$toast.error(err)
      }
    },

    async deleteProduct() {
      try {
        const deletedProduct = Object.assign({}, this.product)
        delete deletedProduct.images
        deletedProduct.isDeleted = true
        await this.$store.dispatch('products/deleteProduct', deletedProduct)
        this.$toast.success('Deleted Successfully!')
        this.$router.push('/')
      } catch (err) {
        this.$toast.error(err)
      }
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
.image {
  width: 30px;
  height: 30px;
  margin: 0 0 0 3px;
  transition: all 0.1s linear;
}
.image:hover {
  transform: scale(1.6);
}
.btn-delete-container {
  height: 45px;
  position: relative;
}
.align-right {
  position: absolute;
  top: 0;
  right: -30px;
}
</style>
