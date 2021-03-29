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
        <input v-model="year" type="number" />
      </div>
      <div>
        <label>Price</label>
        <input v-model="price" type="number" />
      </div>
      <div>
        <label>Attach image</label>
        <fa icon="paperclip" />
        <img v-for="image in images" :key="image.id" :src="image.src" />
      </div>
      <nuxt-link to="/"><button>Cancel</button></nuxt-link>
      <button @click="updateProduct">Update</button>
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
      year: '',
      price: '',
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
    //   async fetch({ store, error, params }) {
    //     try {
    //       await store.dispatch('products/fetchProduct', params.id)
    //       await ImageService.getImageByProductId(params.id).then((res) => {
    //         this.data.images = res.data
    //       })
    //     } catch (e) {
    //       error({
    //         statusCode: 503,
    //         message: e.message,
    //       })
    //     }
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
    updateProduct() {
      const updatedProduct = {
        id: this.product.id,
        brand: this.autocompleteBrand.id,
        model: this.autocompleteModel.id,
        memory: this.autocompleteMemory.id,
        color: this.autocompleteColor.id,
        os: this.autocompleteOS.id,
        year: this.year,
        price: this.price,
        created_at: this.product.created_at,
        updated_at: new Date().toISOString(),
      }
      console.log(updatedProduct)
    },
  },
}
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>
