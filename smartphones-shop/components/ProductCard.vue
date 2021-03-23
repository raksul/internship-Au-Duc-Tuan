<template>
  <div class="product-card">
    <img src="@/assets/img.png" class="product-card-img" />
    <div class="product-card-info">
      <div class="info-column">{{ brand.brand }}</div>
      <div class="info-column">{{ model.model }}</div>
      <div class="info-column">{{ color.color }}</div>
      <div class="info-column">{{ memory.memory }}</div>
      <div class="info-column">${{ product.price }}</div>
      <div><fa icon="pen" /></div>
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
  computed: {
    brand() {
      return VariantsUtil.getBrandByKey(this.product.brand)
    },
    model() {
      return VariantsUtil.getModelByKey(this.product.model)
    },
    color() {
      return VariantsUtil.getColorByKey(this.product.color)
    },
    memory() {
      return VariantsUtil.getMemoryByKey(this.product.memory)
    },
    image() {
      return ''
    },
  },
}
</script>
<style scoped>
.product-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
.product-card-img {
  height: 56px;
  width: 56px;
  transition: all 0.3s linear;
  margin-right: 10px;
  text-align: center;
}
.product-card-info {
  padding: 15px 15px;
  transition: all 0.3s linear;
  cursor: pointer;
  border: 1.5px solid grey;
  border-radius: 15px;
  box-shadow: 0 8px 6px -6px grey;
  /* transition: transform 0.3s; */

  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
}
.product-card-info:hover {
  transform: scale(1.03);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.info-column {
  width: 20%;
}
.product-card-img:hover {
  transform: scale(1.4);
}
</style>
