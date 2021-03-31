<template>
  <div>
    <label>{{ label }}</label>
    <input
      :value="init"
      type="number"
      :class="{ invalid: !isValid }"
      min="0"
      :onkeypress="isDecimal"
      @input="onChange"
    />
  </div>
</template>

<script>
import VariantsUtil from '~/services/VariantsUtil.js'
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
    decimal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isValid: true,
    }
  },
  computed: {
    isDecimal() {
      return this.decimal ? '' : 'return event.charCode >= 48'
    },
  },
  created() {
    this.$emit('input', this.init)
  },
  methods: {
    validate(event) {
      if (VariantsUtil.isNumber(event.target.value)) {
        this.isValid = true
      } else {
        this.isValid = false
      }
    },
    onChange(event) {
      this.$emit('input', event.target.value)
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
