<template>
  <div>
    <div class="row">
      <BaseButton />
      <Search />
    </div>

    <div class="item-card">
      <div class="item-card-img"></div>
      <div class="item-card-info">
        <div class="info-column">Brand</div>
        <div class="info-column">Model</div>
        <div class="info-column">Color</div>
        <div class="info-column">Memory</div>
        <div class="info-column">Price</div>
        <div></div>
      </div>
    </div>

    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>

    <nuxt-link to="/">Home</nuxt-link> |
    <nuxt-link to="/modify">Update</nuxt-link> |
    <nuxt-link to="/register">Create</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
  }),
}
</script>

<style scoped>
.info-column {
  width: 21%;
}

.item-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.item-card-img {
  height: 56px;
  width: 56px;
}
.item-card-info {
  padding: 15px 15px;
  width: 1000px;
  display: flex;
}
.table {
  width: 100%;
}
</style>
