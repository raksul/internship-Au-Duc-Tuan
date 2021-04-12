<template>
  <div>
    <div>
      <span class="seperator">General</span>
      <div class="row">
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedBrand"
          :value="selectedBrand"
          :items="brands"
          label="Brand"
        />
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedModel"
          :value="selectedModel"
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
          :value="selectedMemory"
          :items="memories"
          label="Memory Size"
        />
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedColor"
          :value="selectedColor"
          :items="colors"
          label="Color"
        />
      </div>
      <div class="row">
        <AutoCompleteInput
          class="col-md col-xs"
          v-model="selectedOS"
          :value="selectedOS"
          :items="osVersions"
          label="OS Version"
        />
        <NumberInput
          class="col-md col-xs"
          v-model.number="selectedYear"
          :value="selectedYear"
          label="Year"
        />
      </div>
      <div class="row">
        <NumberInput
          class="col-md col-xs"
          v-model.number="selectedPrice"
          :value="selectedPrice"
          label="Price ($)"
          :decimal="true"
        />
        <div v-if="!isModify" class="col-md col-xs">
          <label for="upload"
            >Attach images <fa icon="paperclip" class="paperclip"
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
        <div v-if="isModify" class="col-md col-xs">
          <label>
            Attach images
            <fa icon="paperclip" class="paperclip paperclip--modify" />
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
import Validator from '~/utilities/Validator'
import { Image, Option, Product, ProductEditForm } from '~/types'
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
    isModify: {
      type: Boolean,
      required: true,
    },
  },
  data(): {
    uploadedImages: Option[]
    selectedBrand: Option
    selectedModel: Option
    selectedMemory: Option
    selectedColor: Option
    selectedOS: Option
    selectedYear: number
    selectedPrice: number
    productDetails: ProductEditForm
  } {
    return {
      uploadedImages: [] as Option[],
      selectedBrand: {} as Option,
      selectedModel: {} as Option,
      selectedMemory: {} as Option,
      selectedColor: {} as Option,
      selectedOS: {} as Option,
      selectedYear: {} as number,
      selectedPrice: {} as number,
      productDetails: {} as ProductEditForm,
    }
  },
  watch: {
    selectedBrand() {
      this.productDetails.brand = this.selectedBrand?.id
      this.$emit('input', this.productDetails)
    },
    selectedModel() {
      this.productDetails.model = this.selectedModel?.id
      this.$emit('input', this.productDetails)
    },
    selectedMemory() {
      this.productDetails.memory = this.selectedMemory?.id
      this.$emit('input', this.productDetails)
    },
    selectedColor() {
      this.productDetails.color = this.selectedColor?.id
      this.$emit('input', this.productDetails)
    },
    selectedOS() {
      this.productDetails.os = this.selectedOS?.id
      this.$emit('input', this.productDetails)
    },
    selectedYear() {
      this.productDetails.year = this.selectedYear
      this.$emit('input', this.productDetails)
    },
    selectedPrice() {
      this.productDetails.price = this.selectedPrice
      this.$emit('input', this.productDetails)
    },
    uploadedImages() {
      this.productDetails.uploadImages = this.uploadedImages
      this.$emit('input', this.productDetails)
    },
  },
  created() {
    if (!Validator.isObjectEmpty(this.product)) {
      this.selectedBrand = getBrandByKey(this.product.brand) as Option
      this.selectedModel = getModelByKey(this.product.model) as Option
      this.selectedColor = getColorByKey(this.product.color) as Option
      this.selectedMemory = getMemoryByKey(this.product.memory) as Option
      this.selectedOS = getOSVersionByKey(this.product.os) as Option
      this.uploadedImages = this.product.images?.map((img) => ({
        id: img.id,
        value: img.src,
      })) as Option[]
      this.selectedYear = this.product.year
      this.selectedPrice = this.product.price
    } else {
      this.selectedBrand = {} as Option
      this.selectedModel = {} as Option
      this.selectedColor = {} as Option
      this.selectedMemory = {} as Option
      this.selectedOS = {} as Option
      this.uploadedImages = [] as Option[]
      this.selectedYear = new Date().getFullYear()
      this.selectedPrice = 0
    }
  },
  computed: {
    // for auto complete inputs
    brands() {
      return getBrands()
    },
    models() {
      return getModelsByBrandKey(this.selectedBrand?.id)
    },
    osVersions() {
      return getOSVersionsByBrand(this.selectedBrand?.id)
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
.paperclip {
  margin-left: 5px;
  margin-top: 10px;
  margin-right: 25px;
  font-size: 30px;
  transition: all 0.1s linear;
}
.paperclip--modify:hover {
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
  .row .col-xs {
    flex-basis: 100%;
  }
  .col-xs .paper-clip {
    margin-top: 23px;
    margin-left: 5px;
    font-size: 20px;
  }
}
</style>
