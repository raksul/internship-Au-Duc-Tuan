<template>
  <div>
    <div class="row">
      <nuxt-link to="/product/add">
        <Button icon="plus" type="primary" label="Add Product" />
      </nuxt-link>
      <SearchInput v-model="search" />
    </div>
    <div class="header-container" v-if="filteredProducts.length > 0">
      <div class="invisible"></div>
      <div class="product-header">
        <div class="col-2"><b>Brand</b></div>
        <div class="col-3"><b>Model</b></div>
        <div class="col-1"><b>Color</b></div>
        <div class="col-1"><b>Memory</b></div>
        <div class="col-1"><b>Price</b></div>
        <div style="width: 15px"></div>
      </div>
    </div>
    <div v-for="product in filteredProducts" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getBrandByKey,
  getModelByKey,
  getColorByKey,
  getMemoryByKey,
} from '~/utilities/VariantsUtil'

export default {
  data() {
    return {
      search: '',
    }
  },
  async fetch({ store, error }) {
    // calling action from $store, fetch product data
    try {
      await store.dispatch('products/fetchProducts')
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message,
      })
    }
  },
  computed: {
    // filter products in $store using user's search input to display
    filteredProducts() {
      return this.products.filter((product) => {
        const brand = getBrandByKey(product.brand)?.value.toLowerCase() || ''
        const model = getModelByKey(product.model)?.value.toLowerCase() || ''
        const color = getColorByKey(product.color)?.value.toLowerCase() || ''
        const memory = getMemoryByKey(product.memory)?.value.toLowerCase() || ''
        const price = product.price.toString().toLowerCase()
        const searchTerm = this.search.toLowerCase()

        return (
          brand.includes(searchTerm) ||
          model.includes(searchTerm) ||
          color.includes(searchTerm) ||
          memory.includes(searchTerm) ||
          price.includes(searchTerm)
        )
      })
    },
    ...mapState({
      // map products in $store with the page after fetch() life cycle above
      products: (state) => state.products.products,
    }),
  },
}
</script>

<style>
.header-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.invisible {
  height: 50px;
  width: 86px;
}
.product-header {
  padding: 15px 15px;
  width: 95%;
  display: flex;
  justify-content: space-between;
}
</style>
