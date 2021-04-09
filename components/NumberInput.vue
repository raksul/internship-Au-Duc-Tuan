<template>
  <div class="number-input-container">
    <label class="label">{{ label }}</label>
    <input
      class="number-input"
      :value="value"
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
    value: {
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

<style>
.number-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.label {
  flex-basis: 40%;
}
.number-input {
  flex-basis: 60%;
  font-size: 16px;
  padding: 7px 20px;
  border: 1px solid black;
  border-radius: 10px;
}
.number-input:focus {
  outline: none;
  border: 2px solid #3fc2b2;
}
.number-input.invalid {
  border: 2px solid #e91e63;
}
</style>
