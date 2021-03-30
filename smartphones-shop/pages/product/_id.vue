<template>
  <div>
    <div>
      <span>General</span>
      <div>
        <label>Brand</label>
        <AutoCompleteInput
          v-model="autocompleteBrand"
          :init="brand"
          :items="brands"
        />
      </div>
      <div>
        <label>Model</label>
        <AutoCompleteInput
          v-model="autocompleteModel"
          :init="model"
          :items="models"
        />
      </div>
    </div>
    <div>
      <span>Varians</span>
      <div>
        <label>Memory Size</label>
        <AutoCompleteInput
          v-model="autocompleteMemory"
          :init="memory"
          :items="memories"
        />
      </div>
      <div>
        <label>Color</label>
        <AutoCompleteInput
          v-model="autocompleteColor"
          :init="color"
          :items="colors"
        />
      </div>
      <div>
        <label>OS Version</label>
        <AutoCompleteInput
          v-model="autocompleteOS"
          :init="os"
          :items="osVersions"
        />
      </div>
      <div>
        <label>Year</label>
        <InputNumber v-model="year" :init="parseInt(product.year)" />
      </div>
      <div>
        <label>Price($)</label>
        <InputNumber v-model="price" :init="parseFloat(product.price)" />
      </div>
      <div>
        <label>Attach image</label>
        <fa icon="paperclip" />
        <img v-for="image in images" :key="image.id" :src="image.src" />
      </div>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" /></nuxt-link>
        <Button icon="edit" @button-clicked="updateProduct" />
      </div>
      <Button icon="trash" :danger="true" @button-clicked="deleteProduct" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VariantsUtil from '~/services/VariantsUtil.js'
import ImageService from '~/services/ImageService.js'
export default {
  data() {
    return {
      images: Array,
      autocompleteBrand: Object,
      autocompleteModel: Object,
      autocompleteMemory: Object,
      autocompleteColor: Object,
      autocompleteOS: Object,
      year: Number,
      price: Number,
    }
  },
  async fetch() {
    // calling action to get product info along with it's image(s) from $store
    await this.$store.dispatch('products/fetchProduct', this.$route.params.id)
    await ImageService.getImageByProductId(this.$route.params.id).then(
      (res) => {
        this.images = res.data
      }
    )
  },
  computed: {
    ...mapState({
      // map products in $store with the page after fetch() life cycle above
      product: (state) => state.products.product,
    }),

    // get data from variants.json file according to product's info
    brand() {
      return VariantsUtil.getBrandByKey(this.product.brand)
    },
    model() {
      return VariantsUtil.getModelByKey(this.product.model)
    },
    color() {
      return VariantsUtil.getColorByKey(this.product.color)
    },
    memory() {
      return VariantsUtil.getMemoryByKey(this.product.memory)
    },
    os() {
      return VariantsUtil.getOSVersionByKey(this.product.os)
    },

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
    async updateProduct() {
      if (
        // check the validation of user's autocomplete input
        VariantsUtil.isObjectEmpty(this.autocompleteBrand) ||
        VariantsUtil.isObjectEmpty(this.autocompleteModel) ||
        VariantsUtil.isObjectEmpty(this.autocompleteMemory) ||
        VariantsUtil.isObjectEmpty(this.autocompleteOS) ||
        VariantsUtil.isObjectEmpty(this.autocompleteColor) ||
        !VariantsUtil.isNumber(this.year) ||
        !VariantsUtil.isNumber(this.price)
      ) {
        this.$toast.error('Please check your input!')
      } else {
        try {
          await this.$store.dispatch('products/updateProduct', {
            id: this.product.id,
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
            created_at: this.product.created_at,
            updated_at: new Date().toISOString(),
          })
          this.$toast.success('Updated Successfully!')
          this.$router.push('/')
        } catch (err) {
          this.$toast.error(err)
        }
      }
    },

    async deleteProduct() {
      try {
        const deletedProduct = Object.assign({}, this.product)
        deletedProduct.is_deleted = true
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
img {
  width: 30px;
  height: 30px;
}
.btn-container {
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
