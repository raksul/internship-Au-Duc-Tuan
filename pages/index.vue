<template>
  <div>
    <div class="row">
      <nuxt-link to="/product/add">
        <Button icon="plus" type="primary" label="Add Product" />
      </nuxt-link>
      <SearchInput v-model="search" />
    </div>
    <div class="header-container" v-if="filteredProducts.length > 0">
      <div class="filler-image hide-mobile"></div>
      <div class="product-header hide-mobile">
        <div class="col-md-2 hide-mobile"><b>Brand</b></div>
        <div class="col-md-3 hide-mobile"><b>Model</b></div>
        <div class="col-md-1 hide-mobile"><b>Color</b></div>
        <div class="col-md-1 hide-mobile"><b>Memory</b></div>
        <div class="col-md-1 hide-mobile"><b>Price</b></div>
        <div class="filler-icon"></div>
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
} from '~/utilities/variantsUtil'

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
        const price = product.price?.toString().toLowerCase() || ''
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
.product-header {
  padding: 10px 15px;
  width: 95%;
  display: flex;
  justify-content: space-between;
}
.filler-image {
  width: 86px;
}
.filler-icon {
  width: 15px;
}
</style>
