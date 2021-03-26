<template>
  <div id="autocomplete">
    <input
      v-model="search"
      type="text"
      :class="{ invalid: !isValid }"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      @focus="onChange"
      @blur="onOutFocus"
    />
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, index) in results"
        :key="index"
        class="autocomplete-result"
        :class="{ 'is-active': index === arrowCounter }"
        @touchend="setResult(result)"
        @mousedown="setResult(result)"
      >
        {{ result.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      returnObject: {},
      results: [],
      isOpen: false,
      arrowCounter: 0,
      isValid: true,
    }
  },
  methods: {
    filterResults() {
      this.results = this.items.filter((item) =>
        item.value.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    onChange() {
      this.filterResults()

      // automatically choose the first suggested result
      // if user's input can fetch data
      if (this.results.length > 0) {
        this.arrowCounter = 0
      }
      this.isOpen = true

      this.$emit('input', this.returnObject)
    },

    // set the autocomplete result when user click on a suggested row
    setResult(result) {
      this.search = result.value
      this.returnObject = result
      this.isOpen = false
    },

    // handling the event when user press arrow down key
    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
        // move the current highlighted result down 1 row
        this.arrowCounter = this.arrowCounter + 1
      } else {
        // move back to the top when the current highlighted result at bottom
        this.arrowCounter = 0
      }
    },

    // handling the event when user press arrow up key
    onArrowUp() {
      if (this.arrowCounter > 0) {
        // move the current highlighted current result up 1 row
        this.arrowCounter = this.arrowCounter - 1
      } else {
        // move to the bottom when the current highlighted result at top
        this.arrowCounter = this.results.length - 1
      }
    },

    // set the autocomplete result when user
    // use up/down arrow key to select a suggested row
    // and press Enter
    onEnter() {
      this.search = this.results[this.arrowCounter].value
      this.returnObject = this.results[this.arrowCounter]
      this.arrowCounter = 0
      this.isOpen = false
      this.$emit('input', this.returnObject)
      this.returnObject = {}
    },

    // handling the event when user tab/click/deselect the input
    onOutFocus() {
      // automatically filter suggestions with user's current input
      this.filterResults()
      // check if the user's current input can fetch any suggested data or not
      if (this.results.length === 0) {
        this.isValid = false
      } else {
        this.isValid = true
        // automatically select an suggestion with user's current input
        this.onEnter()
      }
    },
  },
}
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  position: absolute;
  z-index: 10;
  padding: 4px;
  width: 143px;
  margin: 0;
  border: 1px solid #eeeeee;
  background-color: #fff;
  /* height: 120px; */
  min-height: 1em;
  /* max-height: 6em; */
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

.invalid {
  border: 1px solid red;
}
</style>
