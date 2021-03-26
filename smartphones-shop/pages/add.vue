<template>
  <div>
    <div>
      <span>General</span>
      <div>
        <label>Brand</label>
        <input type="text" />
      </div>
      <div>
        <label>Model</label>
        <input type="text" />
      </div>
    </div>
    <div>
      <span>Varians</span>
      <div>
        <label>Memory Size</label>
        <input type="text" />
      </div>
      <div>
        <label>Color</label>
        <input type="text" />
      </div>
      <div>
        <label>OS Version</label>
        <input type="text" />
      </div>
      <div>
        <label>Year</label>
        <input type="text" />
      </div>
      <div>
        <label>Price</label>
        <input type="text" />
      </div>
      <div>
        <label>Attach image</label>
        <fa icon="paperclip" />
        <!-- <img v-for="image in images" :key="image.id" :src="image.src" /> -->
        <img
          v-for="(uploadedImage, index) in uploadedImages"
          :key="index"
          :src="uploadedImage"
        />
        <input type="file" accept="image/*" multiple @change="handleImages" />
      </div>
      <button @click="addProduct">Click</button>
      <BaseAutoCompleteInput />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import ImageService from '~/services/ImageService.js'
export default {
  data() {
    return {
      uploadedImages: [],
      addedProduct: {
        brand: 'test',
        model: 'test',
        memory: 'test',
        color: 'test',
        os: 'test',
        year: 2018,
        price: 1099.99,
        is_published: true,
        is_sold: false,
        is_deleted: false,
        created_at: '',
        updated_at: '',
      },
    }
  },
  methods: {
    async addProduct() {
      this.addedProduct.id = uuidv4()
      await this.$store.dispatch('products/addProduct', this.addedProduct)
      await this.uploadedImages.forEach((img) => {
        const addedImage = {
          id: uuidv4(),
          src: img,
          product_id: this.addedProduct.id,
        }
        ImageService.addImage(addedImage)
      })
    },
    handleImages(e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const selectedImage = e.target.files[0]
        this.createBase64Image(selectedImage)
      }
    },
    createBase64Image(image) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.uploadedImages.push(e.target.result)
      }
      reader.readAsDataURL(image)
    },
  },
}
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
