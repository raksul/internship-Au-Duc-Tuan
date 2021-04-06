<template>
  <div class="product-card">
    <img
      :src="image.src"
      class="product-card-img"
      :alt="`image-of-product-${image.product_id}`"
    />
    <div class="product-card-info">
      <div class="col-2 hide-mobile">
        {{ brand }}
      </div>
      <div class="col-3 col-4">{{ model }}</div>
      <div class="col-1 col-2">{{ color }}</div>
      <div class="col-1 col-2">{{ memory }}</div>
      <div class="col-1 hide-mobile">{{ price }}</div>
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
} from '~/utilities/VariantsUtil'
import Formatter from '~/utilities/Formatter'
import { Product, Image } from '~/types/index'
import ImageService from '~/services/ImageService'

export default {
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  data(): {
    image: Image
  } {
    return {
      image: {} as Image,
    }
  },
  // fetch image(s) of the product
  async fetch() {
    await ImageService.getImageByProductId(this.product.id).then((res) => {
      if (res.data.length > 0) {
        this.image = res.data[0]
      }
    })
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
      return Formatter.formatMoney(this.product.price)
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
