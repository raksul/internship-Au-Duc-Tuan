<template>
  <div class="container">
    <div>
      <h1 class="title">smartphones-shop</h1>
      <div class="links">
        <nuxt-link to="/product/add">Add New Page</nuxt-link> |
        <nuxt-link to="/product/p001">Edit Page</nuxt-link>
      </div>
      <Button icon="plus" @clicked="showSuccess" />

      <AutoCompleteInput label="Brands" :items="brands" />
      <AutoCompleteInput label="Models" :items="models" />
      <AutoCompleteInput label="Colors" :items="colors" />
      <AutoCompleteInput
        label="With init value"
        :value="brand"
        :items="brands"
      />
      <NumberInput label="Without value" v-model="number1" />
      <NumberInput
        label="With value"
        v-model="number2"
        :initValue="parseInt(100)"
      />
      <Button icon="trash" :danger="true" @clicked="showError" />
      <SearchInput v-model="search" />
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Constants } from '~/constants/MockupData'

export default Vue.extend({
  data() {
    return {
      search: '' as string,
      number1: Number,
      number2: Number,
    }
  },
  methods: {
    showSuccess() {
      this.$toast.success('Success Toast!')
    },
    showError() {
      this.$toast.error('Error Toast!')
    },
  },
  computed: {
    brands() {
      return Constants.BRANDS
    },
    models() {
      return Constants.MODELS
    },
    colors() {
      return Constants.COLORS
    },
    brand() {
      return Constants.BRAND
    },
    product() {
      return Constants.PRODUCT
    },
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
