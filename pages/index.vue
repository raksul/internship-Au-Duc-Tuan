<template>
  <div class="container">
    <div>
      <h1 class="title">smartphones-shop</h1>
      <div class="links">
        <nuxt-link to="/product/add">Add New Page</nuxt-link> |
        <nuxt-link to="/product/p001">Edit Page</nuxt-link>
      </div>
      <Button icon="plus" @clicked="showToast" />
      <AutoCompleteInput label="AutoComplete" :items="items1" />
      <AutoCompleteInput label="AutoComplete" :items="items2" />
      <AutoCompleteInput label="AutoComplete" :items="items3" :value="brand" />
      <NumberInput v-model="number" />
      <SearchInput v-model="search" />
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/Button.vue'

export default Vue.extend({
  components: { Button },
  data() {
    return {
      search: '',
      number: Number,
      brand: { id: '002', value: 'ADD' },
      items1: [
        { id: '001', value: 'AC1-1' },
        { id: '002', value: 'AC1-2' },
        { id: '003', value: 'AC1-3' },
        { id: '004', value: 'AC1-4' },
        { id: '005', value: 'AC1-5' },
        { id: '006', value: 'AC1-6' },
      ],
      items2: [
        { id: '001', value: 'AC2-1' },
        { id: '002', value: 'AC2-2' },
        { id: '003', value: 'AC2-3' },
        { id: '004', value: 'AC2-4' },
        { id: '005', value: 'AC2-5' },
        { id: '006', value: 'AC2-6' },
      ],
      items3: [
        { id: '001', value: 'AC3-1' },
        { id: '002', value: 'AC3-2' },
        { id: '003', value: 'AC3-3' },
        { id: '004', value: 'AC3-4' },
        { id: '005', value: 'AC3-5' },
        { id: '006', value: 'AC3-6' },
      ],
      product: {
        id: 'adas',
        brand: 'apple',
        model: 'ipx',
        memory: 'GB128',
        color: 'black',
        year: 2020,
        price: 1000.99,
      }
    }
  },
  methods: {
    showToast() {
      this.$toast.success('Clicked!')
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
