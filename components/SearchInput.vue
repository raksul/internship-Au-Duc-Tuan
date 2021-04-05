<template>
  <div class="search shadow">
    <input type="text" placeholder="Search..." @input="updateValue" />
    <fa icon="search" class="search-icon" />
  </div>
</template>

<script>
export default {
  methods: {
    // return input value to parent component when changes are made
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style>
.search {
  border: 1.5px solid black;
  border-radius: 10px;
  box-shadow: 0 8px 20px -6px grey;
  height: 37px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.search input[type='text'] {
  border: none;
  width: 155px;
  font-size: 14px;
}
.search input[type='text']:focus {
  outline: none;
}
.search-icon:hover {
  cursor: pointer;
}
</style>
