<template>
  <div>
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
        :isModify="true"
      />
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="updateProduct" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getBrandByKey,
  getModelByKey,
  getOSVersionByKey,
} from '~/utilities/VariantsUtil'
import Validator from '~/utilities/Validator'
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
      if (
        // check the validation of user's autocomplete input
        Validator.isEmptyString(this.productDetails.brand) ||
        Validator.isEmptyString(this.productDetails.model) ||
        Validator.isEmptyString(this.productDetails.memory) ||
        Validator.isEmptyString(this.productDetails.color) ||
        Validator.isEmptyString(this.productDetails.os)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Please check your input again!')
        return
      }
      if (
        !Validator.isBrandModelMatch(
          this.productDetails.brand,
          this.productDetails.model
        )
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${
            getModelByKey(this.productDetails.model)?.value
          }`
        )
        return
      }
      if (
        !Validator.isBrandOSMatch(
          this.productDetails.brand,
          this.productDetails.os
        )
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${
            getOSVersionByKey(this.productDetails.os)?.value
          }`
        )
        return
      }
      if (
        !Validator.isNumber(this.productDetails.year) ||
        !Validator.isNumber(this.productDetails.price)
      ) {
        // inform the user to check inputs again
        this.$toast.error('Make sure Price and Year are numeric!')
        return
      }
      try {
        await this.$store.dispatch('products/updateProduct', {
          id: this.$store.state.products.product.id,
          brand: this.productDetails.brand,
          model: this.productDetails.model,
          memory: this.productDetails.memory,
          color: this.productDetails.color,
          os: this.productDetails.os,
          year: this.productDetails.year,
          price: this.productDetails.price,
          images: this.$store.state.products.product.images,
          isPublished: true,
          isSold: false,
          isDeleted: false,
          createdAt: this.$store.state.products.product.createdAt,
          updatedAt: new Date().toISOString(),
        })
        this.$toast.success('Updated Successfully!')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.$toast.error(err)
      }
    },

    async deleteProduct() {
      try {
        const deletedProduct = Object.assign(
          {},
          this.$store.state.products.product
        )
        delete deletedProduct.images
        deletedProduct.isDeleted = true
        await this.$store.dispatch('products/deleteProduct', deletedProduct)
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
