<template>
  <div id="autocomplete">
    <input v-model="search" type="text" @input="onChange" />
    <ul v-show="isOpen" id="autocomplete-results">
      <li v-for="(result, i) in results" :key="i" class="autocomplete-result">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      result: [],
      isOpen: false,
      items: ['Apple', 'Samsung', 'iPhone', 'Samsung Galaxy', 'Google Pixel'],
    }
  },
  methods: {
    filterResults() {
      this.results = this.items.filter((item) =>
        item.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    onChange() {
      this.filterResults()
      this.isOpen = true
    },
  },
}
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
