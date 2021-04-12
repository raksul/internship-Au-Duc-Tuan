<template>
  <div>
    <ProductEditForm v-model="productDetails" :isModify="false" />
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="addProduct" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import {
  getBrandByKey,
  getModelByKey,
  getOSVersionByKey,
} from '~/utilities/VariantsUtil'
import Validator from '~/utilities/Validator'
import ImageService from '~/services/ImageService'
import { ProductEditForm } from '~/types'
export default {
  data(): {
    productDetails: ProductEditForm
  } {
    return {
      productDetails: {} as ProductEditForm
    }
  },
  methods: {
    // call action from vuex to add product along with its image(s)
    async addProduct() {
      if (
        // check the validation of user's autocomplete input
        Validator.isEmptyString(this.productDetails.brand) ||
        Validator.isEmptyString(this.productDetails.model)||
        Validator.isEmptyString(this.productDetails.memory) ||
        Validator.isEmptyString(this.productDetails.color)||
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
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${getModelByKey(this.productDetails.model)?.value}`
        )
        return
      } 
      if (
        !Validator.isBrandOSMatch(this.productDetails.brand, this.productDetails.os)
      ) {
        // inform the user to check inputs again
        this.$toast.error(
          `${getBrandByKey(this.productDetails.brand)?.value} doesn't support ${getOSVersionByKey(this.productDetails.os)?.value}`
        )
        return
      }
      if (!Validator.isNumber(this.productDetails.year) || !Validator.isNumber(this.productDetails.price)) {
        // inform the user to check inputs again
        this.$toast.error('Make sure Price and Year are numeric!')
        return
      }
      if (this.productDetails.uploadImages.length === 0) {
        // product should have at least 1 picture for the visual of listing page
        this.$toast.error('Product should have at least 1 image!')
        return
      }

      // generating a unique key for product using uuid-npm
      const productId = uuidv4()

      // calling action from Vuex to add product along with its image(s)
      // TODO: should implement rollback mechanism here
      try {
        await this.$store.dispatch('products/addProduct', {
          id: productId,
          brand: this.productDetails.brand,
          model: this.productDetails.model,
          memory: this.productDetails.memory,
          color: this.productDetails.color,
          os: this.productDetails.os,
          year: this.productDetails.year,
          price: this.productDetails.price, 
          isPublished: true,
          isSold: false,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        this.productDetails.uploadImages.forEach(async (img) => {
          const addedImage = {
            id: img.id,
            src: img.value,
            productId: productId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          await ImageService.addImage(addedImage)
        })
        this.$toast.success('Added Successfully!')
        this.$router.push('/')
      } catch (err) {
        this.$toast.error(err)
      }
    },
  },
}
</script>

<style scoped>
.btn-container {
  margin-top: 15px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
