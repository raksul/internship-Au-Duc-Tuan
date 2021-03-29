<template>
  <div>
    <div class="row">
      <nuxt-link to="/add">
        <Button icon="plus" label="Add Product" />
      </nuxt-link>
      <SearchInput v-model="search" />
    </div>

    <div v-if="filteredProducts.length > 0" class="header-container">
      <div class="invisible"></div>
      <div class="product-header">
        <div class="info-column2"><b>Brand</b></div>
        <div class="info-column3"><b>Model</b></div>
        <div class="info-column1"><b>Color</b></div>
        <div class="info-column1"><b>Memory</b></div>
        <div class="info-column1"><b>Price</b></div>
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
import VariantsUtil from '~/services/VariantsUtil.js'
// import ProductService from '~/services/ProductService.js'

export default {
  data() {
    return {
      search: '',
      currentPage: this.$route.params.page || 1,
    }
  },
  async fetch({ store, error }) {
    // calling action from $store, fetch product data
    try {
      await store.dispatch('products/fetchProducts', this.currentPage)
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
      // return ProductService.getProductsBySearch(this.search)
      return this.products.filter((product) => {
        const brand = VariantsUtil.getBrandByKey(
          product.brand
        ).value.toLowerCase()
        const model = VariantsUtil.getModelByKey(
          product.model
        ).value.toLowerCase()
        const color = VariantsUtil.getColorByKey(
          product.color
        ).value.toLowerCase()
        const memory = VariantsUtil.getMemoryByKey(
          product.memory
        ).value.toLowerCase()
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
  height: 76px;
  width: 86px;
}
.product-header {
  padding: 15px 15px;
  width: 95%;
  display: flex;
  justify-content: space-between;
}
.table {
  width: 100%;
}
</style>
