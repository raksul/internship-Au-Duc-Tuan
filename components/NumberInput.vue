<template>
  <div>
    <label>{{ label }}</label>
    <input
      :value="initValue"
      type="number"
      :class="{ invalid: !isValid }"
      min="0"
      :onkeypress="isDecimal"
      @input="onChange"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    initValue: {
      type: Number,
      default: 0,
    },
    decimal: {
      type: Boolean,
      default: false,
    },
  },
  data(): {
    isValid: boolean
  } {
    return {
      isValid: true,
    }
  },
  computed: {
    isDecimal() {
      // only allow user to type dot when isDecimal prop is true
      return this.decimal ? '' : 'return event.charCode >= 48'
    },
  },
  methods: {
    onChange(event: any) {
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
input[type='number'].invalid {
  border: 2px solid #e91e63;
}
</style>
