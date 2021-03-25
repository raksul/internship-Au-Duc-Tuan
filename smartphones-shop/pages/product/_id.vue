<template>
  <div>
    <div>
      <p>{{ product }}</p>
    </div>

    <div>
      <span>General</span>
      <div>
        <label>Brand</label>
        <input type="text" :value="brand.brand" />
      </div>
      <div>
        <label>Model</label>
        <input type="text" :value="model.model" />
      </div>
    </div>
    <div>
      <span>Varians</span>
      <div>
        <label>Memory Size</label>
        <input type="text" :value="memory.memory" />
      </div>
      <div>
        <label>Color</label>
        <input type="text" :value="color.color" />
      </div>
      <div>
        <label>OS Version</label>
        <input type="text" :value="os.version" />
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
        <input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VariantsUtil from '~/services/VariantsUtil.js'
export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('products/fetchProduct', params.id)
      //   await store.dispatch('images/fetchImagesForProduct', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message,
      })
    }
  },
  computed: mapState({
    product: (state) => state.products.product,
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
  }),
}
</script>

<style></style>
