<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
