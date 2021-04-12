<template>
  <div>
    <div class="btn-delete-container">
      <Button
        class="align-right"
        icon="trash"
        type="danger"
        @click="deleteProduct"
      />
    </div>
    <ProductEditForm
      v-model="productDetails"
      :product="this.$store.state.products.product"
      ref="productEditForm"
    />
    <div class="btn-container">
      <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
      <Button icon="edit" type="primary" @click="updateProduct" />
    </div>
  </div>
</template>

<script lang="ts">
import { ProductEditForm } from '~/types'
export default {
  data(): {
    productDetails: ProductEditForm
  } {
    return {
      productDetails: {} as ProductEditForm,
    }
  },
  async fetch() {
    // calling action to get product info along with it's image(s) from $store
    await this.$store.dispatch('products/fetchProduct', this.$route.params.id)
  },
  methods: {
    async updateProduct() {
      if (this.$refs.productEditForm.validate()) {
        try {
          await this.$store.dispatch(
            'products/updateProduct',
            this.productDetails
          )
          this.$toast.success('Updated Successfully!')
          this.$router.push('/')
        } catch (err) {
          console.log(err)
          this.$toast.error(err)
        }
      }
    },

    async deleteProduct() {
      try {
        await this.$store.dispatch(
          'products/deleteProduct',
          this.$store.state.products.product
        )
        this.$toast.success('Deleted Successfully!')
        this.$router.push('/')
      } catch (err) {
        this.$toast.error(err)
      }
    },
  },
}
</script>

<style scoped>
.btn-delete-container {
  height: 30px;
  position: relative;
}
.align-right {
  position: absolute;
  top: 0;
  right: -20px;
}
.btn-container {
  margin-top: 15px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
