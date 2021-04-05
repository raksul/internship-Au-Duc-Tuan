<template>
  <div class="product-card">
    <img
      src="image.src"
      class="product-card-img"
      :alt="`represent-image-for-product-${image.product_id}`"
    />
    <div class="product-card-info">
      <div class="info-column2 hide-desktop">
        {{ brand }}
      </div>
      <div class="info-column3">{{ model }}</div>
      <div class="info-column1">{{ color }}</div>
      <div class="info-column1">{{ memory }}</div>
      <div class="info-column1 hide-desktop">{{ price }}</div>
      <nuxt-link :to="`/product/${product.id}`">
        <fa icon="pen" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import VariantsUtil from '~/utilities/VariantsUtil'
import Formatter from '~/utilities/Formatter'
import { Product, Image, Option } from '~/types/index'

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
  // async fetch() {
  //   await ImageService.getImageByProductId(this.product.id).then((res) => {
  //     if (res.data.length > 0) {
  //       this.image = res.data[0]
  //     }
  //   })
  // },
  computed: {
    // get data from variants.json file according to product's info
    brand(): string {
      return (
        (VariantsUtil.getBrandByKey(this.product.brand) as Option)?.value || ''
      )
    },
    model(): string {
      return (
        (VariantsUtil.getModelByKey(this.product.model) as Option)?.value || ''
      )
    },
    color(): string {
      return (
        (VariantsUtil.getColorByKey(this.product.color) as Option)?.value || ''
      )
    },
    memory(): string {
      return (
        (VariantsUtil.getMemoryByKey(this.product.memory) as Option)?.value ||
        ''
      )
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
}
.product-card-img {
  max-height: 76px;
  max-width: 76px;
  transition: all 0.3s linear;
  margin-right: 10px;
  text-align: center;
}
.product-card-info {
  padding: 15px 15px;
  transition: all 0.3s linear;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 0 8px 6px -4px grey;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-card-img:hover {
  transform: scale(1.6);
  cursor: default;
}
</style>
