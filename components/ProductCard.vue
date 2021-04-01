<template>
  <div class="product-card">
    <img
      src="~/assets/img.png"
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

<script>
import VariantsUtil from '~/services/VariantsUtil.js'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      image: Object,
    }
  },
  // async fetch() {
  //   await ImageService.getImageByProductId(this.product.id).then((res) => {
  //     if (res.data.length > 0) {
  //       this.image = res.data[0]
  //     }
  //   })
  // },
  computed: {
    // get data from variants.json file according to product's info
    brand() {
      return VariantsUtil.getBrandByKey(this.product.brand)?.value
    },
    model() {
      return VariantsUtil.getModelByKey(this.product.model)?.value
    },
    color() {
      return VariantsUtil.getColorByKey(this.product.color)?.value
    },
    memory() {
      return VariantsUtil.getMemoryByKey(this.product.memory)?.value
    },
    price() {
      return VariantsUtil.formatMoney(this.product.price)
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
  flex-direction: row;
}
.product-card-img:hover {
  transform: scale(1.6);
  cursor: default;
}
</style>
