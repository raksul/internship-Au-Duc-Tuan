<template>
  <div>
    <ProductEditForm v-model="formData" :showError="showError" @toggle="toggle" />
      <div class="btn-container">
        <nuxt-link to="/"><Button icon="times" type="primary" /></nuxt-link>
        <Button icon="edit" type="primary" @click="addProduct" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FormData } from '~/types'
export default {
  data(): {
    formData: FormData
    showError: boolean
  } {
    return {
      formData: {} as FormData,
      showError: false,
    }
  },
  methods: {
    // call action from vuex to add product along with its image(s)
    async addProduct() {
      if (this.formData.isValid) {
        // calling action from Vuex to add product along with its image(s)
        // TODO: should implement rollback mechanism here
        try {
          await this.$store.dispatch('products/addProduct', this.formData.productDetails)
          this.$toast.success('Added Successfully!')
          this.$router.push('/')
        } catch (err) {
          this.$toast.error(err)
        }
      } else {
        this.showError = true
      } 
    },
    toggle() {
      this.showError = false
    }
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
