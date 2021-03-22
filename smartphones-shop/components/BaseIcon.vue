<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style></style>
