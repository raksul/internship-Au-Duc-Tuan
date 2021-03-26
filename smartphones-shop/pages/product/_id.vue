<template>
  <div>
    <div>
      <p>{{ product }}</p>
    </div>

    <div>
      <span>General</span>
      <div>
        <label>Brand</label>
        <input type="text" :value="brand.value" />
      </div>
      <div>
        <label>Model</label>
        <input type="text" :value="model.value" />
      </div>
    </div>
    <div>
      <span>Varians</span>
      <div>
        <label>Memory Size</label>
        <input type="text" :value="memory.value" />
      </div>
      <div>
        <label>Color</label>
        <input type="text" :value="color.value" />
      </div>
      <div>
        <label>OS Version</label>
        <input type="text" :value="os.value" />
      </div>
      <div>
        <label>Year</label>
        <input type="text" :value="product.year" />
      </div>
      <div>
        <label>Price</label>
        <input type="text" :value="product.price" />
      </div>
      <div>
        <label>Attach image</label>
        <fa icon="paperclip" />
        <img v-for="image in images" :key="image.id" :src="image.src" />
      </div>
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
      images: [],
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
  },
}
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>
