<template>
  <div>
    <div class="row">
      <BaseButton icon="plus" label="Add Product" />
      <SearchInput v-model="search" />
    </div>

    <div class="header-container">
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
    <nuxt-link to="/">Home</nuxt-link> |
    <nuxt-link to="/modify">Update</nuxt-link> |
    <nuxt-link to="/register">Create</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VariantsUtil from '~/services/VariantsUtil.js'
export default {
  data() {
    return {
      search: '',
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('products/fetchProducts')
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message,
      })
    }
  },
  computed: mapState({
    products: (state) => state.products.products,
    filteredProducts() {
      return this.products.filter((product) => {
        const brand = VariantsUtil.getBrandByKey(
          product.brand
        ).brand.toLowerCase()
        const model = VariantsUtil.getModelByKey(
          product.model
        ).model.toLowerCase()
        const color = VariantsUtil.getColorByKey(
          product.color
        ).color.toLowerCase()
        const memory = VariantsUtil.getMemoryByKey(
          product.memory
        ).memory.toLowerCase()
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
  }),
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
