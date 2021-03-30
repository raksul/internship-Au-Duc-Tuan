<template>
  <div>
    <label>{{ label }}</label>
    <input
      :value="init"
      type="number"
      :class="{ invalid: !isValid }"
      onkeypress="return event.charCode >= 48"
      min="0"
      @input="onChange"
    />
  </div>
</template>

<script>
// import VariantsUtil from '~/services/VariantsUtil.js'
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    init: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isValid: true,
    }
  },
  created() {
    this.$emit('input', this.init)
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value)
      // if (VariantsUtil.isNumber(event.target.value)) {
      //   this.isValid = true
      // } else {
      //   this.isValid = false
      // }
    },
  },
}
</script>

<style scoped>
input {
  font-size: 16px;
  padding: 7px 20px;
  border: 1px solid black;
  border-radius: 10px;
}
input:focus {
  outline: none;
  border: 2px solid #3fc2b2;
}
.invalid {
  border: 2px solid #e91e63 !important;
}
</style>
