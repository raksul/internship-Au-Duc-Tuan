<template>
  <div>
    <div>
      <BaseButton />
      <Search />
    </div>
    <div>
      <ItemCard />
    </div>
    <p>{{ data }}</p>
    <p v-for="(item, index) in data" :key="index">
      {{ item }}
    </p>

    <nuxt-link to="/">Index</nuxt-link>
    <nuxt-link to="/modify">Update</nuxt-link>
    <nuxt-link to="/register">Create</nuxt-link>
  </div>
</template>

<script>
import VariantsUtil from '~/services/VariantsUtil.js'
export default {
  computed: {
    operatingSystems() {
      return VariantsUtil.getOS()
    },
    memories() {
      return VariantsUtil.getMemories()
    },
    colors() {
      return VariantsUtil.getColors()
    },
    brands() {
      return VariantsUtil.getBrands()
    },
    data() {
      return VariantsUtil.getBrandByKey('apple')
    },
  },
}
</script>

<style></style>
