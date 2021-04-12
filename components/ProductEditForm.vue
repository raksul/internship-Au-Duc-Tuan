<template>
  <div>
    <div>
      <span class="seperator">General</span>
      <div class="row">
        <AutoCompleteInput
          class="col-md-6 col-xs-12"
          v-model="brand"
          :value="brand"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          class="col-md-6 col-xs-12"
          v-model="model"
          :value="model"
          :items="models"
          label="Model"
        />
      </div>
    </div>
    <div>
      <span class="seperator">Variants</span>
      <div class="row">
        <AutoCompleteInput
          class="col-md-6 col-xs-12"
          v-model="memory"
          :value="memory"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          class="col-md-6 col-xs-12"
          v-model="color"
          :value="color"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="row">
        <AutoCompleteInput
          class="col-md-6 col-xs-12"
          v-model="os"
          :value="os"
          :items="osVersions"
          label="OS Version"
        />
        <NumberInput
          class="col-md-6 col-xs-12"
          v-model.number="year"
          :value="year"
          label="Year"
        />
      </div>
      <div class="row">
        <NumberInput
          class="col-md-6 col-xs-12"
          v-model.number="price"
          :value="price"
          label="Price ($)"
          :decimal="true"
        />
        <div v-if="!this.product.id" class="col-md-6 col-xs-12">
          <label for="upload"
            >Attach images
            <fa icon="paperclip" class="paperclip paperclip--add"
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
            class="image image--add"
            v-for="(uploadedImage, index) in uploadedImages"
            :key="uploadedImage.id"
            :src="uploadedImage.value"
            @mousedown="removeImage(uploadedImage.id)"
          />
        </div>
        <div v-else="this.product.id" class="col-md-6 col-xs-12">
          <label>
            Attach images
            <fa icon="paperclip" class="paperclip" />
          </label>
          <img
            class="image image--modify"
            v-for="(uploadedImage, index) in this.product.images"
            :key="uploadedImage.id"
            :src="uploadedImage.src"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import ObjectUtil from '~/utilities/ObjectUtil'
import Validator from '~/utilities/Validator'
import { Option, Product, ProductEditForm } from '~/types'
import {
  getBrands,
  getMemories,
  getColors,
  getModelsByBrandKey,
  getOSVersionsByBrand,
  getBrandByKey,
  getModelByKey,
  getColorByKey,
  getMemoryByKey,
  getOSVersionByKey,
} from '~/utilities/VariantsUtil'
export default {
  props: {
    product: {
      type: Object as () => Product,
      default() {
        return {} as Product
      },
    },
  },
  data(): {
    uploadedImages: Option[]
    brand: Option
    model: Option
    memory: Option
    color: Option
    os: Option
    year: number
    price: number
    productDetails: ProductEditForm
  } {
    return {
      uploadedImages: [] as Option[],
      brand: {} as Option,
      model: {} as Option,
      memory: {} as Option,
      color: {} as Option,
      os: {} as Option,
      year: {} as number,
      price: {} as number,
      productDetails: {} as ProductEditForm,
    }
  },
  watch: {
    details() {
      this.productDetails.brand = this.brand?.id
      this.productDetails.model = this.model?.id
      this.productDetails.memory = this.memory?.id
      this.productDetails.color = this.color?.id
      this.productDetails.os = this.os?.id
      this.productDetails.year = this.year
      this.productDetails.price = this.price
      this.productDetails.uploadImages = this.uploadedImages
      this.$emit('input', this.productDetails)
    },
  },
  created() {
    if (!Validator.isObjectEmpty(this.product)) {
      this.brand = getBrandByKey(this.product.brand) as Option
      this.model = getModelByKey(this.product.model) as Option
      this.color = getColorByKey(this.product.color) as Option
      this.memory = getMemoryByKey(this.product.memory) as Option
      this.os = getOSVersionByKey(this.product.os) as Option
      this.uploadedImages = this.product.images?.map((img) => ({
        id: img.id,
        value: img.src,
      })) as Option[]
      this.year = this.product.year
      this.price = this.product.price
    } else {
      this.brand = {} as Option
      this.model = {} as Option
      this.color = {} as Option
      this.memory = {} as Option
      this.os = {} as Option
      this.uploadedImages = [] as Option[]
      this.year = new Date().getFullYear()
      this.price = 0
    }
  },
  computed: {
    details() {
      return [
        this.brand,
        this.model,
        this.memory,
        this.color,
        this.os,
        this.year,
        this.price,
        this.uploadedImages,
      ]
    },

    // for auto complete inputs
    brands() {
      return getBrands()
    },
    models() {
      return getModelsByBrandKey(this.brand?.id)
    },
    osVersions() {
      return getOSVersionsByBrand(this.brand?.id)
    },
    memories() {
      return getMemories()
    },
    colors() {
      return getColors()
    },
  },
  methods: {
    // loop through uploaded image(s) and convert them to base64
    async handleImages(e) {
      e.target.files.forEach(async (file: Blob) => {
        this.uploadedImages.push({
          id: uuidv4(),
          value: await ObjectUtil.convertToBase64(file),
        })
      })
    },

    removeImage(id: string) {
      this.uploadedImages = this.uploadedImages.filter(
        (image) => image.id !== id
      )
    },

    validate() {
      if (
        // check the validation of user's autocomplete input
        !this.productDetails.brand ||
        !this.productDetails.model ||
        !this.productDetails.memory ||
        !this.productDetails.color ||
        !this.productDetails.os
      ) {
        // inform the user to check inputs again
        this.$toast.error('Please check your input again!')
        return false
      }
      if (
        !Validator.isBrandModelMatch(
          this.productDetails.brand,
          this.productDetails.model
        )
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${
            getModelByKey(this.productDetails.model)?.value
          }`
        )
        return false
      }
      if (
        !Validator.isBrandOSMatch(
          this.productDetails.brand,
          this.productDetails.os
        )
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${
            getOSVersionByKey(this.productDetails.os)?.value
          }`
        )
        return false
      }
      if (
        !Validator.isNumber(this.productDetails.year) ||
        !Validator.isNumber(this.productDetails.price)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Make sure Price and Year are numeric!')
        return false
      }
      if (this.productDetails.uploadImages.length === 0) {
        // product should have at least 1 picture for the visual of listing page
        this.$toast.error('Product should have at least 1 image!')
        return false
      }
      return true
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
  justify-content: space-between;
  align-items: center;
}
.col-md-6 {
  flex-basis: 50%;
  padding: 0 30px 0 30px;
}
.btn-container {
  margin-top: 15px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.paperclip {
  margin-left: 5px;
  margin-top: 10px;
  margin-right: 25px;
  font-size: 30px;
  transition: all 0.1s linear;
}
.paperclip--add:hover {
  cursor: pointer;
  transform: scale(1.3);
}
.image {
  width: 30px;
  height: 30px;
  margin: 0 0 0 3px;
}
.image--add:hover {
  outline: 2px solid red;
}

.image--modify:hover {
  transform: scale(1.6);
  outline: none;
}

/* For responsive */
@media screen and (max-width: 768px) {
  /* Add, modify page */
  .col-md-6 {
    padding: 0 15px 0 15px;
  }
  .row .col-xs-12 {
    flex-basis: 100%;
  }
  .col-xs-12 .paper-clip {
    margin-top: 23px;
    margin-left: 5px;
    font-size: 20px;
  }
}
</style>
