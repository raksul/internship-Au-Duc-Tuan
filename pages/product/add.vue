<template>
  <div>
    <ProductEditForm v-model="productDetails" ref="productEditForm"/>
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="addProduct" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
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
      if (this.$refs.productEditForm.validate()) {

        // calling action from Vuex to add product along with its image(s)
        // TODO: should implement rollback mechanism here
        try {
          await this.$store.dispatch('products/addProduct', this.productDetails)
          this.$toast.success('Added Successfully!')
          this.$router.push('/')
        } catch (err) {
          this.$toast.error(err)
        }
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
