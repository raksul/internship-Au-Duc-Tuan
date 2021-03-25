<template>
  <nuxt-link :to="'/product/' + product.id">
    <div class="product-card">
      <img src="@/assets/img.png" class="product-card-img" />
      <div class="product-card-info">
        <div v-if="windowWidth > 710" class="info-column2">
          {{ brand.brand }}
        </div>
        <div class="info-column3">{{ model.model }}</div>
        <div class="info-column1">{{ color.color }}</div>
        <div class="info-column1">{{ memory.memory }}</div>
        <div v-if="windowWidth > 710" class="info-column1">
          ${{ product.price }}
        </div>
        <div><fa icon="pen" /></div>
      </div>
    </div>
  </nuxt-link>
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
      windowWidth: 711,
    }
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
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
}
</script>
<style>
a {
  text-decoration: none;
  color: black;
}
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
  /* flex: 0 0 10%; */
  transition: all 0.3s linear;
  margin-right: 10px;
  text-align: center;
}
.product-card-info {
  padding: 15px 15px;
  transition: all 0.3s linear;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 0 8px 6px -4px grey;

  width: 95%;
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
.product-card-img:hover {
  transform: scale(1.6);
}
</style>
