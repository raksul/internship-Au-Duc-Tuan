<template>
  <div class="container">
    <div>
      <h1 class="title">smartphones-shop</h1>
      <div class="links">
        <nuxt-link to="/product/add">Add New Page</nuxt-link> |
        <nuxt-link to="/product/p001">Edit Page</nuxt-link>
      </div>
      <Button icon="plus" type="primary" @clicked="showSuccess" />

      <AutoCompleteInput label="Without init value" :items="brands" />
      <AutoCompleteInput
        label="With init value"
        :value="brand"
        :items="brands"
      />
      <NumberInput label="Without value" v-model="number1" />
      <NumberInput label="With value" v-model="number2" :initValue="number2" />
      <Button icon="trash" type="danger" @clicked="showError" />
      <SearchInput v-model="search" />
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VariantsUtil from '~/utilities/VariantsUtil'

export default Vue.extend({
  data() {
    return {
      search: '',
      number1: Number,
      number2: 100,
    }
  },
  methods: {
    showSuccess() {
      console.log(VariantsUtil.getBrands())

      this.$toast.success('Success Toast!')
    },
    showError() {
      this.$toast.error('Error Toast!')
    },
  },
  computed: {
    brands() {
      return [
        { id: 'apple', value: 'Apple' },
        { id: 'samsung', value: 'Samsung' },
        { id: 'google', value: 'Google' },
        { id: 'vivo', value: 'Vivo' },
      ]
    },
    brand() {
      return { id: 'apple', value: 'Apple' }
    },
    product() {
      return {
        id: 'p001',
        brand: 'apple',
        model: 'ipx',
        memory: 'GB128',
        color: 'black',
        year: 2020,
        price: 1000.99,
        created_at: '2021-03-31T08:27:34.857Z',
        updated_at: '2021-03-31T08:27:34.857Z',
      }
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
