<template>
  <div class="product-card">
    <img
      :src="image.src"
      class="product-card-img"
      :alt="`image-of-product_${product.id}`"
    />
    <div class="product-card-info">
      <div class="col-md-2 hide-mobile">
        {{ brand }}
      </div>
      <div class="col-md-3 col-xs-4">{{ model }}</div>
      <div class="col-md-1 col-xs-2">{{ color }}</div>
      <div class="col-md-1 col-xs-2">{{ memory }}</div>
      <div class="col-md-1 hide-mobile">{{ price }}</div>
      <nuxt-link :to="`/product/${product.id}`">
        <fa icon="pen" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getBrandByKey,
  getModelByKey,
  getColorByKey,
  getMemoryByKey,
} from '~/utilities/variantsUtil'
import { formatMoney } from '~/utilities/utility'
import { Product, Image } from '~/types'

export default {
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  computed: {
    // get data from variants.json file according to product's info
    brand(): string {
      return getBrandByKey(this.product.brand)?.value || ''
    },
    model(): string {
      return getModelByKey(this.product.model)?.value || ''
    },
    color(): string {
      return getColorByKey(this.product.color)?.value || ''
    },
    memory(): string {
      return getMemoryByKey(this.product.memory)?.value || ''
    },
    price(): string {
      return formatMoney(this.product.price)
    },
    image(): Image {
      return this.product.images ? this.product.images[0] : ({} as Image)
    },
  },
}
</script>
<style>
.product-card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
}
.product-card-img {
  max-height: 76px;
  max-width: 76px;
  margin-right: 10px;
  text-align: center;
  transition: all 0.3s linear;
}
.product-card-info {
  padding: 15px 15px;
  transition: all 0.3s linear;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 0 8px 6px -4px grey;
  flex-basis: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-card-img:hover {
  transform: scale(1.6);
  cursor: default;
}
</style>
