<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <fa icon="exclamation" class="fa-3x" />
    <p v-if="statusCode === 404">
      <nuxt-link to="/"> Return to homepage </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      // <--- Send in the error
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      // <--- Get the status code
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      // <--- Print the error
      return this.error.message
    },
  },
}
</script>

<style scoped>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
.container {
  margin: auto;
  text-align: center;
}
</style>
